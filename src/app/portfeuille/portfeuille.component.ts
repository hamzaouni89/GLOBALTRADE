import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CryptoAPIService } from '../crypto-api.service';
import { Crypto } from '../models/cryptoModele';
import { FormBuilder, FormGroup, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AngularFireDatabase, AngularFireList, listChanges } from '@angular/fire/database';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { map } from 'rxjs/internal/operators/map';
import { Observable, empty } from 'rxjs';



let connected = JSON.parse(localStorage.getItem("connected")) || [];


export interface DialogData {

}


@Component({
  selector: 'app-portfeuille',
  templateUrl: './portfeuille.component.html',
  styleUrls: ['./portfeuille.component.css'],

})




export class PortfeuilleComponent implements OnInit {

  buyForm: FormGroup;
  interval: any;
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  profilRef: AngularFireList<any>;
  profil: Observable<any[]>;
  authState: any;
  totalCost: any;
  prof_loss: any;
  uid: string;
   result;
  coin: string;
  current: string;
  amount: string;
  Buy_Price: string;
  Currency: string;
  Bought: string;
  url: string;
  coins: any;
  afficher=false;
  
  transaction = { coin: '', amount: '', Buy_Price: '', Currency: '', Bought: '', uid: '', current: '', url: '' };

  constructor(
    public dialog: MatDialog,
    public CryptoService: CryptoAPIService,
    private fb: FormBuilder, db: AngularFireDatabase) {
    this.profilRef = db.list('boughtcoin');

    this.profil = this.profilRef.snapshotChanges().pipe(
      map((changes: any) =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );



    this.itemsRef = db.list('boughtcoin');

    this.items = this.itemsRef.snapshotChanges().pipe(
      map((changes: any) =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )


    );
  }


  refreshData() {

    let lists = [];
    this.prof_loss = 0;
    this.totalCost = 0;
    
    this.CryptoService.getCrypto().subscribe(res => {
      this.result = res.Data;


      this.result.forEach(resapi => {

        this.items.subscribe(items => {
          items.forEach(element => {

            if ((resapi.CoinInfo.Name == element.coin) && (connected.uid == element.uid)) {
             
               
              this.itemsRef.update(element.key, { current: resapi.RAW.USD.PRICE, url: resapi.CoinInfo.ImageUrl })
           //  this.prof_loss += ((resapi.RAW.USD.PRICE) * parseInt(element.amount)) - (parseInt(element.Buy_Price) * parseInt(element.amount));
            }

          });


        });
      })


    })


  } 


  showcoin() {
    //this.refreshData();

    this.items.subscribe(coins => {
     
      this.coins = coins.filter(elem => elem.uid === connected.uid);
     // console.log(this.coins);
      if (this.coins.length ==0) {

        this.afficher=false;
      }else{
        this.afficher=true;
      }
      
     
    });
  }
  ngAfterViewInit() {

    this.interval = setInterval(() => {
      
     //this.refreshData();
     this.updateprofil();

    this.showcoin();
  this.updatecost();
    }, 10000);
    

  }



  ngOnInit() {
    this.prof_loss = 0;
    this.totalCost = 0;
    
    this.refreshData();
     

    this.showcoin();
  this.updatecost();
  this.updateprofil();   
  }
  updateprofil() {
    this.prof_loss = 0;
    
    this.profil.subscribe(prof => {
      prof.forEach(ele => {
        if ((connected.uid == ele.uid)) {
         
          this.prof_loss += (parseInt(ele.current) * parseInt(ele.amount)) - (parseInt(ele.Buy_Price) * parseInt(ele.amount));
        }


      });


    });

  }
  sellcoin(key: any){

    console.log(key);
    this.itemsRef.remove(key);
  }

  updatecost() {
    this.totalCost = 0;
    
    this.profil.subscribe(prof => {
      prof.forEach(el => {
        if ((connected.uid == el.uid)) {
          this.totalCost += parseInt(el.Buy_Price) * parseInt(el.amount);

        }


      });


    });

  } 

  openDialog(): void {
    const dialogRef = this.dialog.open(PortfeuilleComponentDialog, {
      width: '600px',
      // height: '400px',
      data: { coin: this.coin, amount: this.amount, Buy_Price: this.Buy_Price, Currency: this.Currency, Bought: this.Bought, uid: connected.uid, current: "", url: "" }
    });

    dialogRef.afterClosed().subscribe(result => {
      
      this.transaction = result;
      //console.log(this.transaction);
      this.itemsRef.push(this.transaction);
     // this.afficher=true;
     this.updatecost();
     this.updateprofil();
     this.showcoin();

    });
  }
 /* sellcoin(key: any): void {
      // height: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      
      this.transaction = result;
      
      this.itemsRef.push(this.transaction);
      this.totalCost = 0;
      this.prof_loss = 0;
      // this.updatecost();
this.refreshData();
    }); 
  }
*/

}

@Component({
  selector: 'app-portfeuille',
  templateUrl: 'portfeuilledialog.html',
})
export class PortfeuilleComponentDialog {

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  authState: any;
  uid: string;
  result;


  transaction = { coin: '', amount: '', Buy_Price: '', Currency: '', Bought: '', uid: '' };

  constructor(

    public dialogRef: MatDialogRef<PortfeuilleComponentDialog>,





    @Inject(MAT_DIALOG_DATA) public data: DialogData,

    public dialog: MatDialog,
    public CryptoService: CryptoAPIService,
    db: AngularFireDatabase) {
    this.itemsRef = db.list('boughtcoin');

    this.items = this.itemsRef.snapshotChanges().pipe(
      map((changes: any) =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'app-portfeuille',
  templateUrl: 'sellcoin.html',
})
export class sellcoinDialog {

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  authState: any;
  uid: string;
  result;


  transaction = { coin: '', amount: '', Buy_Price: '', Currency: '', Bought: '', uid: '' };

  constructor(

    public dialogRef: MatDialogRef<sellcoinDialog>,





    @Inject(MAT_DIALOG_DATA) public data: DialogData,

    public dialog: MatDialog,
    public CryptoService: CryptoAPIService,
    db: AngularFireDatabase) {
    this.itemsRef = db.list('boughtcoin');

    this.items = this.itemsRef.snapshotChanges().pipe(
      map((changes: any) =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

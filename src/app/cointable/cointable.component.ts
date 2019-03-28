import { Component, OnInit, ViewChild, HostBinding } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CryptoAPIService } from '../crypto-api.service';
import {Crypto} from '../models/cryptoModele';


@Component({
  selector: 'app-cointable',
  templateUrl: './cointable.component.html',
  styleUrls: ['./cointable.component.css'],
  
})


export class CointableComponent implements OnInit {
  interval: any;
  
  displayedColumns : string[] = ['n','Name', 'Price', 'Direct', 'Total', 'MktCap','chart', 'Chg'];
  dataSource = new MatTableDataSource(); 
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public CryptoService: CryptoAPIService) {

  }

  // ngAfterViewInit(){
  /*  this.CryptoService= Observable
   .interval(1000)
   .startWith(0).switchMap(() => this.CryptoService.getCrypto()); */




  //}



 refreshData(){
  this.CryptoService.getCrypto().subscribe((data: any) => {
    
    this.dataSource = new MatTableDataSource(data.Data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    
    this.dataSource.filterPredicate =
     (datas: Crypto, filters: string) => {
     return  JSON.stringify(datas).indexOf(filters)!=-1;
  }
})
 }
  
 ngAfterViewInit(){

  this.interval = setInterval(() => { 
    this.refreshData(); 
}, 10000);


 }
  
  ngOnInit() {
    this.refreshData();
  
   
}


  applyFilter(filterValue: string) {
    const filters = filterValue.trim().toLowerCase();
    this.dataSource.filter = filters;
  }

}


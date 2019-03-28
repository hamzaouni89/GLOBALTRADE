import { Component, OnInit } from '@angular/core';
//import {ticker}from 'angular-ticker/ticker.js';
import { CryptoAPIService } from '../crypto-api.service';
import {Crypto} from '../models/cryptoModele';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
@Component({
  selector: 'app-tiker',
  templateUrl: './tiker.component.html',
  styleUrls: ['./tiker.component.css']
})
export class TikerComponent implements OnInit {
  datas;
  interval: any;
  constructor(public CryptoService: CryptoAPIService,private router: Router) {
  
  }
  
  ngAfterViewInit(){
    this.interval = setInterval(() => { 
      this.refreshData(); 
  }, 10000);
  
   }
   refreshData(){
    this.CryptoService.getCrypto().subscribe((data: any) => {
      this.datas=data.Data;
         // console.log(this.datas);
    })
  
   }

  ngOnInit() {
    this.refreshData();

}
}
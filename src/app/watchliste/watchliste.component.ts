


import { Component, OnInit } from '@angular/core';
import { CryptoAPIService } from '../crypto-api.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-watchliste',
  templateUrl: './watchliste.component.html',
  styleUrls: ['./watchliste.component.css']
})
export class WatchlisteComponent implements OnInit {
  datas;
  result;
interval: any;
  constructor(public CryptoService: CryptoAPIService, private route : ActivatedRoute) { }

  refreshData(){
    this.CryptoService.getCrypto().subscribe((data: any) => {
    this.datas=data.Data;
    // console.log(this.datas);
    })
    }

/**
    refreshDetail(){
      let id= this.route.snapshot.paramMap.get("id");
      this.CryptoService.detail('BTC').subscribe((res: any) => {
      this.result=res.DISPLAY.BTC.USD;
      
      console.log(this.result.IMAGEURL);

      })
      } */
  ngOnInit() {
   // this.refreshDetail();
    this.refreshData();
   
  }
 
}

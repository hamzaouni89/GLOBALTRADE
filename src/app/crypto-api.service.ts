import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Crypto } from '../app/models/cryptoModele';
import {Chart} from 'chart.js'
@Injectable({
  providedIn: 'root'

})
export class CryptoAPIService {
  private cryptoUrl = 'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=20&tsym=USD' //'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR';

  private chartUrl='https://min-api.cryptocompare.com/data/histoday?fsym=';
  private detailUrl='https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=';
  private marketsUrl='https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=';
  
  constructor(private Http: HttpClient) { }

  getCrypto(): Observable<Crypto> {
    //console.log('test');
    return this.Http.get<Crypto>(this.cryptoUrl);
    // return this.http.get('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD');
    // tslint:disable-next-line:max-line-length
    // return this.http.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,DASH&tsyms='+coin+'USD,EUR&api_key='+'55447dcf063b6c88eed9387897a338c5699a77ea9a8c2c6d7fe00401046de288' );
    // tslint:disable-next-line:max-line-length
    // return this.http.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym='+coin+'&tsyms=USD&ts=1452680400&api_key='+'55447dcf063b6c88eed9387897a338c5699a77ea9a8c2c6d7fe00401046de288' );
  }

 coinDetail(coin): Observable<Crypto> {
  
    return this.Http.get<Crypto>(this.detailUrl+coin+'&tsym=USD&api_key=55447dcf063b6c88eed9387897a338c5699a77ea9a8c2c6d7fe00401046de288');
   
  }
  
  coinChart(coin): Observable<Crypto> {
  
  return this.Http.get<Crypto>(this.chartUrl+coin+"&tsym=USD&limit1");
 
}
getArticle(coin):Observable<Crypto> {
  
  return this.Http.get<Crypto>("https://min-api.cryptocompare.com/data/v2/news/?categories="+ coin +"&lang=EN");
}
getMarkets(coin):Observable<Crypto> {
  
  return this.Http.get<Crypto>(this.marketsUrl+ coin+"&tsym=USD&limit=50");
}
}

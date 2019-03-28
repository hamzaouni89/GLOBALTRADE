import { Component, OnInit , ViewChild} from '@angular/core';
import { CryptoAPIService } from '../crypto-api.service';
import { Crypto } from '../models/cryptoModele';
import { Chart } from 'chart.js';
import { ActivatedRoute, Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { Location } from '@angular/common';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';





@Component({
  selector: 'app-marchee',
  templateUrl: './marchee.component.html',
  styleUrls: ['./marchee.component.css']
})
export class MarcheeComponent implements OnInit {
  interval: any;
  displayedColumns : string[] = ['Market','Price', 'Open 24H', 'Range 24H', 'Last trade', 'Volume 24H','Change 24H'];
  dataSource = new MatTableDataSource(); 
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  chart = [];
  currentValue: string;
  datas;
  result;
  article;
  
  
  
  constructor(public CryptoService: CryptoAPIService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
  ) {
    router.events.subscribe((event: Event) => {

      if (event instanceof NavigationEnd) {
        let id = this.route.snapshot.paramMap.get('id');
        this.getchart(id);
      }

    });
  }
  ngAfterViewInit() {

    this.interval = setInterval(() => {
      this.refreshData();
    }, 2000);

  }
  refreshData() {
    let id = this.route.snapshot.paramMap.get('id');

    this.CryptoService.getCrypto().subscribe(res => {
      this.result = res.Data;


    })

  }

  getchart(id) {


    this.CryptoService.coinChart(id).subscribe(res => {

      let price_max = res['Data'].map((res: any) => res.hight);

      let price_min = res['Data'].map((res: any) => res.low);
      let alldates = res['Data'].map((res: any) => res.time);

      let Dates = []
      alldates.forEach((res) => {
        let jsdate = new Date(res * 1000)
        Dates.push(jsdate.toDateString())
      })

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: Dates,
          datasets: [
            {
              data: price_max,
              borderColor: "#264B39",
              fill: true
            },
            {
              data: price_min,
              borderColor: "#228B22",
              fill: true
            },
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });


    })

  }
 
  marketsData() {
    let id = this.route.snapshot.paramMap.get('id');
    this.CryptoService.getMarkets(id).subscribe((data: any) => {
      //console.log(data.Data.Exchanges);
      this.dataSource = new MatTableDataSource(data.Data.Exchanges);      
      this.dataSource.paginator = this.paginator;
      
  }); 
  }

  articleData(){
    let id = this.route.snapshot.paramMap.get('id');
    this.CryptoService.getArticle(id).subscribe(articles => {
      this.article = articles.Data;

      // console.log(this.article[0].source_info.img);
    });
  }

  ngOnInit() {
    // this.getchart();
    this.refreshData();
    this.articleData();
    this.marketsData() ;


  }
}
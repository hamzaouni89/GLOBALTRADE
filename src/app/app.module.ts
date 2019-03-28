import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TikerComponent } from './tiker/tiker.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MarketComponent } from './market/market.component';
import { CryptoComponent } from './crypto/crypto.component';
import { MarcheeComponent } from './marchee/marchee.component';
import { WatchlisteComponent } from './watchliste/watchliste.component';
import { PortfeuilleComponent ,PortfeuilleComponentDialog, sellcoinDialog} from './portfeuille/portfeuille.component';

import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { CryptoAPIService } from './crypto-api.service';
import { MatTableModule } from '@angular/material';
import { CointableComponent } from './cointable/cointable.component';
import { MatFormFieldModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule } from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatSortModule} from '@angular/material/sort';
import { OverlayModule } from "@angular/cdk/overlay";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
//import { DialogOverviewExample} from './portfeuille/dialog-overview-example';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule, MatDatepickerModule } from '@angular/material';
import { MatMenuModule, MatNativeDateModule } from '@angular/material';
import { CoinDetailComponent } from './coin-detail/coin-detail.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    TikerComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    MarketComponent,
    CryptoComponent,
    MarcheeComponent,
    CointableComponent,
    WatchlisteComponent,
    PortfeuilleComponent,
    FooterComponent,
    PortfeuilleComponent ,PortfeuilleComponentDialog,sellcoinDialog,
    CoinDetailComponent
  ],
  entryComponents: [PortfeuilleComponentDialog,sellcoinDialog],
  imports: [MatIconModule, MatMenuModule, AngularFireModule.initializeApp(environment.firebase), AngularFireDatabaseModule,
    ReactiveFormsModule, MatNativeDateModule,
    MatGridListModule,
    
    [MatDialogModule],
    [OverlayModule],
    MatCheckboxModule, MatTabsModule,
    MatRadioModule,
    MatDatepickerModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatRippleModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatPaginatorModule,
    FlexLayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatSortModule ,
    MatTabsModule,
    MatToolbarModule,
    
  ],
  providers: [CryptoAPIService, AuthService, AngularFireAuth,
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule, Http } from '@angular/http';

import { AccountsModule } from '../accounts/accounts.module';
import { BanksModule } from '../banks/banks.module';
import { LoginModule } from '../login/login.module';
import { AuthenticationHttpService } from '../login/authentication-http-service';

const appRoutes: Routes = [
  {path: '', redirectTo: '/accounts', pathMatch: 'full'},
];

@NgModule({
  imports: [
    AccountsModule,
    BanksModule,
    LoginModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [ AppComponent ],
  providers: [
    { provide: Http, useClass: AuthenticationHttpService }
  ]
})

export class AppModule {}

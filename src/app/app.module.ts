import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MarkerService } from './marker.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BattlefieldEventsComponent } from './battlefield-events/battlefield-events.component';
import { NetworkMonitoringComponent } from './network-monitoring/network-monitoring.component';
import { AssestMangmtComponent } from './assest-mangmt/assest-mangmt.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BattlefieldEventsComponent,
    NetworkMonitoringComponent,
    AssestMangmtComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    MarkerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

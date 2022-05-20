import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BattlefieldEventsComponent } from './battlefield-events/battlefield-events.component';
import { NetworkMonitoringComponent } from './network-monitoring/network-monitoring.component';
import { AssestMangmtComponent } from './assest-mangmt/assest-mangmt.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path:'', redirectTo:'login', pathMatch: 'full'},
  { path: 'login',       component: LoginComponent },
  { path: 'login/home',  component: HomeComponent},
  { path: 'battlefield', component: BattlefieldEventsComponent},
  { path: 'network',     component: NetworkMonitoringComponent},
  { path: 'assetMngmt',  component: AssestMangmtComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

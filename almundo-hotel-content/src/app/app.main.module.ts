import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppHotelModule } from './submodules/app.hotel.module';
import { AppRootSectionComponent } from './components/app.root.section.component';
import { AppHeaderSectionComponent } from './components/app.header.component';
import { AppLeftSectionComponent } from './components/app.left.section.component';
import { AppRightSectionComponent } from './components/app.right.section.component';
import { StarsViewComponent } from './components/app.stars.view.component';
import { HotelService } from './services/hotel.service';

import { Routes, RouterModule } from '@angular/router';
import { AppHotelManagerComponent } from './components/app.hotel-manager.component';
import { AppHotelReportComponent } from './components/app.hotel-report.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/report', pathMatch: 'full' },
  { path: 'report', component: AppHotelReportComponent },
  { path: 'manager', component: AppHotelManagerComponent },
];

@NgModule({
  declarations: [
    AppRootSectionComponent,
    AppHeaderSectionComponent,
    AppLeftSectionComponent,
    AppRightSectionComponent,
    StarsViewComponent,
    AppHotelReportComponent,
    AppHotelManagerComponent
  ],
  imports: [
    BrowserModule,
    AppHotelModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [HotelService],
  bootstrap: [AppRootSectionComponent]
})
export class AppMainModule { }

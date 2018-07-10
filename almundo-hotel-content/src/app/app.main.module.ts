import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppHotelModule } from './modules/app.hotel.module';
import { AppRootSectionComponent } from './components/app.root.section.component';
import { AppHeaderSectionComponent } from './components/app.header.component';
import { AppLeftSectionComponent } from './components/app.left.section.component';
import { AppRightSectionComponent } from './components/app.right.section.component';

@NgModule({
  declarations: [AppRootSectionComponent, AppHeaderSectionComponent, AppLeftSectionComponent, AppRightSectionComponent],
  imports: [BrowserModule, AppHotelModule],
  providers: [],
  bootstrap: [AppRootSectionComponent]
})
export class AppMainModule {}

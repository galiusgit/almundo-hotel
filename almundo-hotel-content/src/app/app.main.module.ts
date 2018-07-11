import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppHotelModule } from './submodules/app.hotel.module';
import { AppRootSectionComponent } from './components/app.root.section.component';
import { AppHeaderSectionComponent } from './components/app.header.component';
import { AppLeftSectionComponent } from './components/app.left.section.component';
import { AppRightSectionComponent } from './components/app.right.section.component';
import { StarsViewComponent } from './components/app.stars.view.component';

@NgModule({
  declarations: [AppRootSectionComponent, AppHeaderSectionComponent, AppLeftSectionComponent, AppRightSectionComponent, StarsViewComponent],
  imports: [BrowserModule, AppHotelModule],
  providers: [],
  bootstrap: [AppRootSectionComponent]
})
export class AppMainModule {}

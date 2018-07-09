import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppHotelModule } from './modules/app.hotel.module';
import { AppRootComponent } from './components/app.root.component';

@NgModule({
  declarations: [AppRootComponent],
  imports: [BrowserModule, AppHotelModule],
  providers: [],
  bootstrap: [AppRootComponent]
})
export class AppMainModule {}

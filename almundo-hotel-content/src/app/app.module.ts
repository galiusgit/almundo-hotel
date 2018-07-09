import { BrowserModule } from '@angular/platform-browser/platform-browser';
import { NgModule } from '@angular/core/core';

import { AppBoostrapModule } from './app-boostrap/app-boostrap.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppBoostrapModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

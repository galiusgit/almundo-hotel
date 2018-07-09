import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown/index';
import { TooltipModule } from 'ngx-bootstrap/tooltip/index';
import { ModalModule } from 'ngx-bootstrap/modal/index';

@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ],
  exports: [BsDropdownModule, TooltipModule, ModalModule]
})
export class AppHotelModule {}

import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

/*
<app-left-section class="col-xs-12 col-sm-3 col-lg-3"></app-left-section>
<app-right-section class="col-xs-12 col-sm-9 col-lg-9"></app-right-section>
*/

@Component({
  selector: 'app-root-section',
  template: `
  <app-header-section></app-header-section>
  <router-outlet></router-outlet>
  <div class="clearfix"></div>
  `,
  styles: [
    `.logo {
      max-height: 30px;
      padding-bottom: 5px;
    }
    `]
})
export class AppRootSectionComponent {
  public modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}

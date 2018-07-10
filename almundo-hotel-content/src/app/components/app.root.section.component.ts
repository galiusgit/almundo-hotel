import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root-section',
  //templateUrl: './app.root.component.html',
  template: `
  <app-header-section></app-header-section>
  <app-left-section></app-left-section>
  <app-right-section></app-right-section>
  `,
  styles: [
    `.logo {
      max-height: 30px;
      padding-bottom: 5px;
    }`
  ]
})
export class AppRootSectionComponent {
  public modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}

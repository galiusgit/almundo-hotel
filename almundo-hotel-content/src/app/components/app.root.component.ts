import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.root.component.html',
  styles: [
    `.logo {
      max-height: 30px;
      padding-bottom: 5px;
    }`
  ]
})
export class AppRootComponent {
  public modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}

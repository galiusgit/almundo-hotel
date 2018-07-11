import { Component } from '@angular/core';

@Component({
  selector: 'app-header-section',
  template: `
  <div class="col-xs-12 col-sm-12 col-lg-12 header-section-container">
  <img alt="Almundo logo" src="assets/images/logo-almundo.svg" data-file-width="512" data-file-height="512"/>
  </div>
  `,
  styles: [
    `.header-section-container{
          background: #144484;
          padding-top: 10px;
          padding-bottom: 10px;
      }
    `]
})
export class AppHeaderSectionComponent {
  title: string = "App Header Section Component";
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-section',
  template: `
  <nav class="navbar navbar-default header-section-container">
      <div class="container-fluid">
          <div class="navbar-header">
          <img alt="Almundo logo" src="assets/images/logo-almundo.svg" data-file-width="512" data-file-height="512"/>
          </div>
          <ul class="nav navbar-nav ml-auto">
              <li class="active">
              <a href="/report">Link <span class="sr-only">(current)</span></a></li>
              <li><a href="/manager">Link</a></li>
          </ul>
      </div>
  </nav>
  `,
  styles: [
    `.header-section-container{
          background: #144484;
          padding-top: 10px;
          padding-bottom: 10px;
      }
    `]
})
export class AppHeaderSectionComponent implements OnInit {
  
  public title: string = "App Header Section Component";

  public ngOnInit(): void {
    //throw new Error("Method not implemented.");
  }

}

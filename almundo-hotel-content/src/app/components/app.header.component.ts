import { Component } from '@angular/core';

@Component({
  selector: 'app-header-section',
  template: `
  <div class="col-xs-12 col-sm-12 col-lg-12" style="border: 1px solid red;"><h2>{{title}}</h2></div>
  `
})
export class AppHeaderSectionComponent {
  title: string = "App Header Section Component";
}

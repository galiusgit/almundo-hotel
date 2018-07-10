import { Component } from '@angular/core';

@Component({
  selector: 'app-left-section',
  template: `
  <div class="col-xs-12 col-sm-2 col-lg-2" style="border: 1px solid red;"><h2>{{title}}</h2></div>
  `
})
export class AppLeftSectionComponent {
  title: string = "App Left Section Component";
}

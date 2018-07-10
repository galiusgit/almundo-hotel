import { Component } from '@angular/core';

@Component({
  selector: 'app-right-section',
  template: `<div class="col-xs-12 col-sm-10 col-lg-10" style="border: 1px solid red;"><h2>{{title}}</h2></div>`
})
export class AppRightSectionComponent {
  title: string = "App Right Section Component";
}
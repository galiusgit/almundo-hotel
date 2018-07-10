import { Component } from '@angular/core';

@Component({
  selector: 'app-right-section',
  template: `<h2>{{title}}</h2>`
})
export class AppRightSectionComponent {
  title: string = "AppRightSectionComponent";
}
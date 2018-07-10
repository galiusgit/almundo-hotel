import { Component } from '@angular/core';

@Component({
  selector: 'app-header-section',
  template: `<h2>{{title}}</h2>`
})
export class AppHeaderSectionComponent {
  title: string = "Header";
}

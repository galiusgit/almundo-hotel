import { Component } from '@angular/core';

@Component({
  selector: 'app-left-section',
  template: `<h2>{{title}}</h2>`
})
export class AppLeftSectionComponent {
  title: string = "My title";
}

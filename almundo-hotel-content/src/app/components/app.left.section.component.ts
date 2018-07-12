import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-section',
  templateUrl: './app.left.section.component.html'
})
export class AppLeftSectionComponent implements OnInit {
  public title: string = "App Left Section Component";
  public showHotelNameForm: boolean = true;
  public showStarsRate: boolean = true;

  public ngOnInit(): void {

  }

}

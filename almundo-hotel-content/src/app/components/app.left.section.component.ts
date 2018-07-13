import { Component, OnInit } from '@angular/core';
import { FilterRequestModel } from '../../../../common-hotel-dependencies/src/hotel/models/FilterRequestModel';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-left-section',
  templateUrl: './app.left.section.component.html',
})
export class AppLeftSectionComponent implements OnInit {
  public title: string = 'App Left Section Component';
  public showHotelNameForm: boolean = true;
  public showStarsRate: boolean = true;
  private allOptionsMap: Object = { 1: true, 2: true, 3: true, 4: true, 5: true };
  public optionsMap: Object = this.allOptionsMap;
  public isAllChecked = true;

  constructor(private router: Router){

  }

  public ngOnInit(): void {

  }

  public onClickSubmit(data: any) {
    const starsResult: Array<number> = [];
    for (const optio of Object.keys(this.optionsMap)) {
      starsResult.push(parseInt(optio, 0));
    }
    const modelRequets: FilterRequestModel = {
      name: data.name,
      stars: starsResult,
    };
    console.log(modelRequets, Object.keys(this.optionsMap));
    this.router.navigate(['/report'], { queryParams: modelRequets });
  }

  public allChecked(option, event) {
    this.isAllChecked = event.target.checked;
    if (event.target.checked) {
      this.optionsMap = this.allOptionsMap;
    } else {
      this.optionsMap = {};
    }
  }

  public updateChecked(option, event) {
    if (event.target.checked) {
      this.optionsMap[option] = option;
    } else {
      delete this.optionsMap[option];
    }
  }

}

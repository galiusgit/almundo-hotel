import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'stars-view',
  template: `
    <span tooltip="{{numberStars}} estrellas">
      <span *ngFor="let starNum of starArr" class="icon-star star-{{starNum}}"></span>
    </span>
  `,
  styles: [
    `.icon-star{
      color: #FFBB00;
      margin-right: 3px;
    }` 
  ]
})
export class StarsViewComponent implements OnInit {

  starArr: Array<number> = new Array();

  @Input('number-stars') numberStars: number;

  constructor() {}

  ngOnInit() {
    for(let x = 1; x <= this.numberStars; x++){
      this.starArr.push(x);
    }
  }

}

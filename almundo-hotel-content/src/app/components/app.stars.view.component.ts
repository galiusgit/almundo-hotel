import { Component, OnInit, Input } from '@angular/core';
/**
 * StarsViewComponent
 * @export
 * @class StarsViewComponent
 * @implements {OnInit}
 */
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
    }`,
  ],
})
export class StarsViewComponent implements OnInit {

  /**
   * starArr
   * @type {Array<number>}
   * @memberof StarsViewComponent
   */
  public starArr: Array<number> = new Array();

  /**
   * numberStars
   * @type {number}
   * @memberof StarsViewComponent
   */
  @Input('number-stars') public numberStars: number;

  /**
   * Creates an instance of StarsViewComponent.
   * @memberof StarsViewComponent
   */
  constructor() { }

  /**
   * ngOnInit
   * @memberof StarsViewComponent
   */
  public ngOnInit() {
    for (let x = 1; x <= this.numberStars; x++) {
      this.starArr.push(x);
    }
  }

}

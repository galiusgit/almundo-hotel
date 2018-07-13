import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router, NavigationEnd } from '@angular/router';
import { RouterUtil } from '../util/router.util';
/**
 * AppRootSectionComponent
 * @export
 * @class AppRootSectionComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-root-section',
  template: `
  <app-header-section></app-header-section>
  <router-outlet></router-outlet>
  <div class="clearfix"></div>
  `,
  styles: [
    `.logo {
      max-height: 30px;
      padding-bottom: 5px;
    }
    `],
})
export class AppRootSectionComponent implements OnInit {
  /**
   * @type {BsModalRef}
   * @memberof AppRootSectionComponent
   */
  public modalRef: BsModalRef;

  /**
   * @type {string}
   * @memberof AppRootSectionComponent
   */
  public currentRoute: string;

  /**
   * Creates an instance of AppRootSectionComponent.
   * @param {BsModalService} modalService
   * @param {Router} router
   * @param {RouterUtil} routerUtil
   * @memberof AppRootSectionComponent
   */
  constructor(
    private modalService: BsModalService,
    private router: Router,
    private routerUtil: RouterUtil,
  ) {
    this.buildCurrentRoute();
  }

  /**
   * buildCurrentRoute
   * @private
   * @memberof AppRootSectionComponent
   */
  private buildCurrentRoute(): void {
    this.router.events.filter((event: any) => event instanceof NavigationEnd)
      .subscribe(event => {
        this.routerUtil.setCurrentRoute(event.url);
      });
  }

  /**
   * openModal
   * @param {TemplateRef<any>} template
   * @memberof AppRootSectionComponent
   */
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  /**
   * ngOnInit
   * @memberof AppRootSectionComponent
   */
  public ngOnInit(): void { }
}

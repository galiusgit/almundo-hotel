import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router, NavigationEnd } from '@angular/router';
import { RouterUtil } from '../util/router.util';

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

  public modalRef: BsModalRef;

  public currentRoute: string;

  constructor(
    private modalService: BsModalService,
    private router: Router,
    private routerUtil: RouterUtil,
  ) {
    this.buildCurrentRoute();
  }

  private buildCurrentRoute(): void {
    this.router.events.filter((event: any) => event instanceof NavigationEnd)
        .subscribe(event => {
            this.routerUtil.setCurrentRoute(event.url);
        });
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  public ngOnInit(): void {
    // console.log('currentRoute: ', this.currentRoute);
  }
}

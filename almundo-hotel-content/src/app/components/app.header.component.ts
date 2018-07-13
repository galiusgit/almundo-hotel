import { Component, OnInit } from '@angular/core';
import { RouterUtil } from '../util/router.util';

@Component({
  selector: 'app-header-section',
  template: `
  <nav class="navbar navbar-light header-section-container">
      <div class="container-fluid">
          <div class="navbar-header">
          <img alt="Almundo logo" src="assets/images/logo-almundo.svg" data-file-width="512" data-file-height="512"/>
          </div>
            <ul class="nav navbar-nav navbar-right">
                <li class="{{getClassAcitveByRoute('/report')}}"><a href="/report"><strong>Reporte</strong></a></li>
                <li class="{{getClassAcitveByRoute('/manager')}}"><a href="/manager"><strong>Admin</strong></a></li>
            </ul>
      </div>
  </nav>`,
  styles: [
    `.header-section-container{
          background: #144484;
          border-radius: unset !important;
          padding: 5px;
      }
      .navbar-nav>li>a{
        color: #FFFFFF;
        border: 1px solid #eee;
        margin: 2px;
        border-radius: 4px;
      }
      .navbar-nav>li>a:hover{
        color: #337ab7;
      }
    `],
})
export class AppHeaderSectionComponent implements OnInit {
  public title: string = 'App Header Section Component';

  constructor(private routerUtil: RouterUtil){}

  public ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }

  public getClassAcitveByRoute(strRoute: string): string{
    return this.routerUtil.isRouteActive(strRoute) ? 'active' : '';
  }

}

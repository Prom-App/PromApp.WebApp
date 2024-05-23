import { Component, OnInit, ViewChild } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { UntilDestroy } from "@ngneat/until-destroy";
import { MenuResponse } from "@shared/models/menu.interface";
import { IconService } from "@shared/services/icon.service";
import { MenuService } from "@shared/services/menu.service";
import { filter, map, startWith } from "rxjs/operators";
import { NavigationService } from "src/@vex/services/navigation.service";
import { SidebarComponent } from "../../@vex/components/sidebar/sidebar.component";
import { ConfigService } from "../../@vex/services/config.service";
import { LayoutService } from "../../@vex/services/layout.service";
import { checkRouterChildsData } from "../../@vex/utils/check-router-childs-data";

@UntilDestroy()
@Component({
  selector: "vex-custom-layout",
  templateUrl: "./custom-layout.component.html",
  styleUrls: ["./custom-layout.component.scss"],
})
export class CustomLayoutComponent implements OnInit {
  menu: any | MenuResponse[];

  sidenavCollapsed$ = this.layoutService.sidenavCollapsed$;
  isFooterVisible$ = this.configService.config$.pipe(
    map((config) => config.footer.visible)
  );
  isDesktop$ = this.layoutService.isDesktop$;

  toolbarShadowEnabled$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    startWith(null),
    map(() =>
      checkRouterChildsData(
        this.router.routerState.root.snapshot,
        (data) => data.toolbarShadowEnabled
      )
    )
  );

  @ViewChild("configpanel", { static: true }) configpanel: SidebarComponent;

  constructor(
    private layoutService: LayoutService,
    private configService: ConfigService,
    private router: Router,
    private navigationService: NavigationService,
    private _menuService: MenuService,
    private iconService: IconService
  ) {}

  ngOnInit() {
    // let menuArray: any[] = [];
    // this._menuService.getMenuByRole().subscribe((resp) => {
    //   this.menu = resp;
    //   if (this.menu != null) {
    //     this.menu.map((m: MenuResponse) => {
    //       if (m.fatherId == 0 && m.path == null) {
    //         const obj = {
    //           menuId: m.menuId,
    //           type: "dropdown",
    //           label: m.item,
    //           icon: this.iconService.getIcon(m.icon),
    //           children: [],
    //         };
    //
    //         menuArray.push(obj);
    //       } else if (m.fatherId == 0 && m.path != null) {
    //         const obj = {
    //           menuId: m.menuId,
    //           type: "link",
    //           label: m.item,
    //           icon: this.iconService.getIcon(m.icon),
    //           route: m.path,
    //         };
    //
    //         menuArray.push(obj);
    //       }
    //     });
    //
    //     this.menu.map((m: MenuResponse) => {
    //       if (m.fatherId != 0) {
    //         const index = menuArray.findIndex((p) => p.menuId === m.fatherId);
    //
    //         const obj = {
    //           type: "link",
    //           label: m.item,
    //           route: m.path,
    //         };
    //
    //         menuArray[index].children.push(obj);
    //       }
    //     });
    //   }
    // });
    // this.navigationService.items = menuArray;
  }
}

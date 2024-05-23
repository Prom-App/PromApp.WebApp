import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { Platform } from "@angular/cdk/platform";
import { DOCUMENT } from "@angular/common";
import { Component, Inject, LOCALE_ID, OnInit, Renderer2 } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IconService } from "@shared/services/icon.service";
import { Settings } from "luxon";
import { filter, map } from "rxjs/operators";
import { ConfigName } from "../@vex/interfaces/config-name.model";
import { ConfigService } from "../@vex/services/config.service";
import { NavigationService } from "../@vex/services/navigation.service";
import { Style, StyleService } from "../@vex/services/style.service";
import { MenuService } from "@shared/services/menu.service";
import { MenuResponse } from "@shared/models/menu.interface";
import { BaseApiResponse } from "@shared/models/base-api-response.interface";
import {routing} from "@shared/static-helpers/routing";

@Component({
  selector: "vex-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "vex";

  constructor(
    private configService: ConfigService,
    private styleService: StyleService,
    private renderer: Renderer2,
    private platform: Platform,
    @Inject(DOCUMENT) private document: Document,
    @Inject(LOCALE_ID) private localeId: string,
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private iconService: IconService
  ) {
    Settings.defaultLocale = this.localeId;

    if (this.platform.BLINK) {
      this.renderer.addClass(this.document.body, "is-blink");
    }

    this.configService.updateConfig({
      sidenav: {
        title: "PromAPP",
        imageUrl: "/assets/img/demo/logo.svg",
        showCollapsePin: true,
      },
    });

    this.route.queryParamMap
      .pipe(
        map(
          (queryParamMap) =>
            queryParamMap.has("rtl") &&
            coerceBooleanProperty(queryParamMap.get("rtl"))
        )
      )
      .subscribe((isRtl) => {
        this.document.body.dir = isRtl ? "rtl" : "ltr";
        this.configService.updateConfig({
          rtl: isRtl,
        });
      });

    this.route.queryParamMap
      .pipe(filter((queryParamMap) => queryParamMap.has("layout")))
      .subscribe((queryParamMap) =>
        this.configService.setConfig(queryParamMap.get("layout") as ConfigName)
      );

    this.route.queryParamMap
      .pipe(filter((queryParamMap) => queryParamMap.has("style")))
      .subscribe((queryParamMap) =>
        this.styleService.setStyle(queryParamMap.get("style") as Style)
      );
    this.navigationService.items = [
      {
        type: "link",
        label: "Perfil",
        route: routing.PROFILE,
        icon: iconService.getIcon("icDashboard"),
      },
      {
        type: "link",
        label: "Estadísticas",
        route: "estadisticas",
        icon: iconService.getIcon("icDashboard"),
      },
      // {
      //   type: "link",
      //   label: "Almacenes",
      //   route: "almacenes",
      //   icon: iconService.getIcon("icWarehouse"),
      // },
      // {
      //   type: "dropdown",
      //   label: "Catálogo",
      //   icon: iconService.getIcon("icManage"),
      //   children: [
      //     {
      //       type: "link",
      //       label: "Categorias",
      //       route: "categorias",
      //     },
      //     {
      //       type: "link",
      //       label: "Productos",
      //       route: "productos",
      //     },
      //   ],
      // },
      // {
      //   type: "link",
      //   label: "Proveedores",
      //   route: "proveedores",
      //   icon: iconService.getIcon("icProvider"),
      // },
      // {
      //   type: "link",
      //   label: "Usuarios",
      //   route: "usuarios",
      //   icon: iconService.getIcon("icClient"),
      // },
      // {
      //   type: "dropdown",
      //   label: "Procesos",
      //   icon: iconService.getIcon("icSales"),
      //   children: [
      //     {
      //       type: "link",
      //       label: "Proceso de Compras",
      //       route: "proceso-compras",
      //     },
      //     {
      //       type: "link",
      //       label: "Proceso de Ventas",
      //       route: "proceso-ventas",
      //     },
      //   ],
      // },
      {
        type: "dropdown",
        label: "Configuración",
        icon: iconService.getIcon("icSettings"),
        children: [
          {
            type: "link",
            label: "Usuarios",
            route: "usuarios",
          },
          {
            type: "link",
            label: "Roles",
            route: "roles",
          },
          {
            type: "link",
            label: "Permisos",
            route: "permisos",
          },
        ],
      },
    ];
  }
}

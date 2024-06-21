import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "@shared/guards/auth.guard";
import { VexRoutes } from "src/@vex/interfaces/vex-route.interface";
import { CustomLayoutComponent } from "./custom-layout/custom-layout.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { routing } from "@shared/static-helpers/routing";
import { OnBoardingTestComponent } from "./pages/test/on-boarding-test/on-boarding-test.component";
import {SelectAvatarComponent} from "./pages/account/components/select-avatar/select-avatar.component";
import {CompleteProfileComponent} from "./pages/account/components/complete-profile/complete-profile.component";

const accountRoutes: VexRoutes = [
  {
    path: "",
    loadChildren: () =>
        import("./pages/account/account.module").then((m) => m.AccountModule),
  },
];

const childrenRoutes: VexRoutes = [
  {
    path: "estadisticas",
    loadChildren: () =>
        import("./pages/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
        ),
  },
  {
    path: "categorias",
    loadChildren: () =>
        import("./pages/category/category.module").then((m) => m.CategoryModule),
  },
  {
    path: "proveedores",
    loadChildren: () =>
        import("./pages/provider/provider.module").then((m) => m.ProviderModule),
  },
  {
    path: "productos",
    loadChildren: () =>
        import("./pages/product/product.module").then((m) => m.ProductModule),
  },
  {
    path: "almacenes",
    loadChildren: () =>
        import("./pages/warehouse/warehouse.module").then(
            (m) => m.WarehouseModule
        ),
  },
  {
    path: "proceso-compras",
    loadChildren: () =>
        import("./pages/product-entry/product-entry.module").then(
            (m) => m.ProductEntryModule
        ),
  },
  {
    path: "clientes",
    loadChildren: () =>
        import("./pages/client/client.module").then((m) => m.ClientModule),
  },
  {
    path: "proceso-ventas",
    loadChildren: () =>
        import("./pages/sale/sale.module").then((m) => m.SaleModule),
  },
  {
    path: "usuarios",
    loadChildren: () =>
        import("./pages/user/user.module").then((m) => m.UserModule),
  },
  {
    path: "roles-permisos",
    loadChildren: () =>
        import("./pages/role/role.module").then((m) => m.RoleModule),
  },
  {
    path: "rol-usuarios",
    loadChildren: () =>
        import("./pages/user-role/user-role.module").then(
            (m) => m.UserRoleModule
        ),
  },
  {
    path: "permisos",
    loadChildren: () =>
        import("./pages/permission/permission.module").then(
            (m) => m.PermissionModule
        ),
  },
  {
    path: routing.ACCOUNT,
    children: accountRoutes,
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];

const routes: VexRoutes = [
  {
    path: "",
    redirectTo: "estadisticas",
    pathMatch: "full",
  },
  {
    path: "login",
    loadChildren: () =>
        import("./pages/auth/auth.module").then((m) => m.AuthModule),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: routing.ON_BOARDING_TEST,
    loadChildren: () =>
        import("./pages/test/test.module").then((x) => x.TestModule),
    component: OnBoardingTestComponent,
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "",
    component: CustomLayoutComponent,
    children: childrenRoutes,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "enabled",
      relativeLinkResolution: "corrected",
      anchorScrolling: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

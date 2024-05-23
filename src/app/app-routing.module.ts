import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "@shared/guards/auth.guard";
import { VexRoutes } from "src/@vex/interfaces/vex-route.interface";
import { CustomLayoutComponent } from "./custom-layout/custom-layout.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";

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
  // Creamos el módulo y el componente para el login|||| Y aquí creamos nuestra ruta inicial que será el Login del sistema
  {
    path: "login",
    loadChildren: () =>
      import("./pages/auth/auth.module").then((m) => m.AuthModule),
    data: {
      containerEnabled: true,
    },
  },
  {
    path: "",
    component: CustomLayoutComponent,
    children: childrenRoutes,
    // Aquí con la propiedad llamada canActivate podemos asignarle el guard que acabamos de crear|||| entonces con esto indicamos que nuestros modulos o rutas hijas estarán protegidas.
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: "enabled",
      relativeLinkResolution: "corrected",
      anchorScrolling: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

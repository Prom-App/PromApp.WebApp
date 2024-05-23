import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionRoutingModule } from './permission-routing.module';
import { PermissionListComponent } from './components/permission-list/permission-list.component';
import { PermissionManageComponent } from './components/permission-manage/permission-manage.component';


@NgModule({
  declarations: [
    PermissionListComponent,
    PermissionManageComponent
  ],
  imports: [
    CommonModule,
    PermissionRoutingModule
  ]
})
export class PermissionModule { }

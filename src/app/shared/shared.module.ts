import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { IconModule } from "@visurel/iconify-angular";
import { NgxSpinnerModule } from "ngx-spinner";
import { PageLayoutModule } from "src/@vex/components/page-layout/page-layout.module";
import { ScrollbarModule } from "src/@vex/components/scrollbar/scrollbar.module";
import { ContainerModule } from "src/@vex/directives/container/container.module";
import { MaterialModule } from "./import-modules/material.module";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import {
  ProfileProgressBarComponent
} from "@shared/components/profile/profile-progress-bar/profile-progress-bar.component";
import {ProfileHeaderComponent} from "@shared/components/profile/profile-header/profile-header.component";

@NgModule({
  declarations: [
    ProfileProgressBarComponent,
    ProfileHeaderComponent
  ],
  imports: [],
  exports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    IconModule,
    ContainerModule,
    ScrollbarModule,
    FlexLayoutModule,
    PageLayoutModule,
    NgxSpinnerModule,
    NgxChartsModule,
    ProfileProgressBarComponent,
    ProfileHeaderComponent
  ],
})
export class SharedModule {}

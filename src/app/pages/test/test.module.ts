import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {OnBoardingTestComponent} from "./on-boarding-test/on-boarding-test.component";
import {SharedModule} from "@shared/shared.module";

@NgModule({
    declarations: [
        OnBoardingTestComponent,
    ],
    imports: [CommonModule, SharedModule]
})
export class TestModule {
}

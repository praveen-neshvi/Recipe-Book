import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { LoaderSpinnerComponent } from "./loader/loader-spinner/loader-spinner.component";
import { DropdownDirective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    AlertComponent,
    LoaderSpinnerComponent,
    DropdownDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    LoaderSpinnerComponent,
    DropdownDirective,
    CommonModule
  ]
})
export class SharedModule {

}

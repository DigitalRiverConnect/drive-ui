import {CommonModule} from "@angular/common";
import {PopoverDirective} from "./popover.directive";
import {PopoverContent} from "./popover.content";
import {NgModule} from "@angular/core";

export * from "./popover.directive";
export * from "./popover.content";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PopoverContent,
    PopoverDirective,
  ],
  exports: [
    PopoverContent,
    PopoverDirective,
  ],
  entryComponents: [
    PopoverContent
  ]
})
export class PopoverModule {

}
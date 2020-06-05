import { NgModule } from '@angular/core';
import { NativeScriptModule } from "@nativescript/angular/nativescript.module";
import { NSSnackbarContentComponent } from './content/ns-snackbar-content.component';
import { NSSnackbarService } from './ns-snackbar-parent.service';
import { NSSnackbarParentComponent } from './parent/ns-snackbar-parent.component';

const WIDGETS = [NSSnackbarParentComponent];
const WIDGETS_ENTRY_COMPONENTS = [NSSnackbarContentComponent];

@NgModule({
  imports: [NativeScriptModule],
  declarations: [WIDGETS, WIDGETS_ENTRY_COMPONENTS],
  entryComponents: [WIDGETS_ENTRY_COMPONENTS],
  exports: [WIDGETS, WIDGETS_ENTRY_COMPONENTS],
  providers: [NSSnackbarService]
})
export class NSSnackbarModule { }
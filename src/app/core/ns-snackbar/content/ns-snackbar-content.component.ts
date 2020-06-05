import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NSSnackbarService } from '../ns-snackbar-parent.service';
import { NSSnackbarActionButton, NSSnackbarResultType, NSSnackbarResponse, NSSnackbarMessage } from './ns-snackbar-content.interface';
import { ad } from "@nativescript/core/utils/utils";
import { isAndroid } from 'tns-core-modules/ui/page/page';
const MESSAGE_SLIDEINUP_CLASSES = 'message--snackbar animate-slideInUp-delay-0ms';
const MESSAGE_SLIDEOUTDOWN_CLASSES = 'message--snackbar animate-slideOutDown-delay-0ms';

import { topmost } from '@nativescript/core/ui/frame';

@Component({
  selector: 'ns-snackbar-content',
  templateUrl: './ns-snackbar-content.component.html',
  styleUrls: ['./ns-snackbar-content.component.css']
})
export class NSSnackbarContentComponent implements OnInit {
  columns: string = '*';
  messageClasses: string = MESSAGE_SLIDEINUP_CLASSES;

  buttonBorderRadius: number = 5;
  buttonVerticalPadding: string = "12";
  buttonTitleColor: string = '#FFFFFF';
  buttonBackgroundColor: string = '#332f2c';
  buttonBorderColor: string = 'transparent';

  onActionButton: boolean = false;

  messageBorderRadius: number = 5;
  messageTitleColor: string = '#FFFFFF';
  messageBackgroundColor: string = '#332f2c';
  messageBorderColor: string = 'transparent';

  @Input('message') message: NSSnackbarMessage;
  @Input('action') action: NSSnackbarActionButton; // { title: 'Action', titleColor: '#ffffff', backgroundColor: '#000000', borderColor: '#ffffff', borderRadius: 5 }
  @Input('duration') duration: number; // miliseconds
  constructor(private _snackbarService: NSSnackbarService) { }

  ngOnInit(): void {
    this.setMessage();
    this.setAction();
    this.forceCloseKeyboard();

    if (this.message) {
      this.hideMessage();
    } else {
      this.closeWithResult({ resultType: NSSnackbarResultType.Error, error: 'message is undefined!' });
    }

  }

  setAction(): void {
    if (this.action && this.action.title) {
      this.columns = '3*,2*';
      this.buttonTitleColor = this.action.titleColor || this.buttonTitleColor;
      this.buttonBackgroundColor = this.action.backgroundColor || this.buttonBackgroundColor;
      this.buttonBorderColor = this.action.borderColor || this.buttonBorderColor;
      this.buttonBorderRadius = this.action.borderRadius || this.buttonBorderRadius;
      this.buttonVerticalPadding = "6";
    }
  }

  setMessage(): void {
    if (this.message && this.message.title) {
      this.messageTitleColor = this.message.titleColor || this.messageTitleColor;
      this.messageBackgroundColor = this.message.backgroundColor || this.messageBackgroundColor;
      this.messageBorderColor = this.message.borderColor || this.messageBorderColor;
      this.messageBorderRadius = this.message.borderRadius || this.messageBorderRadius;
    }
  }

  hideMessage(): void {
    //TODO: manage timeouts with promises
    setTimeout(() => {
      this.setMessageClasses(MESSAGE_SLIDEOUTDOWN_CLASSES);
      setTimeout(() => {
        if (!this.onActionButton) {
          this.closeWithResult({ resultType: NSSnackbarResultType.Dismissed });
        }
      }, 1000);
    }, this.duration);
  }

  setMessageClasses(classes: string): void {
    this.messageClasses = classes;
  }

  closeWithResult(response: NSSnackbarResponse) {
    setTimeout(() => {
      this._snackbarService.dynamicView$.next({
        open: false,
        response
      });
    }, 0);

  }

  onAction(): void {
    this.onActionButton = true;
    this.closeWithResult({ resultType: NSSnackbarResultType.OnAction });
  }

  forceCloseKeyboard(): void {
    setTimeout(() => {
      (isAndroid) ? ad.dismissSoftInput() : topmost().nativeView.endEditing(true);
    }, 0);
  }
}

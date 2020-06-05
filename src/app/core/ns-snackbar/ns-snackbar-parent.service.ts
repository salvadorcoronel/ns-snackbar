import { Injectable, NgZone } from "@angular/core";
import { Subject } from "rxjs";
import { NSSnackbarParentDataSource } from "./parent/ns-snackbar-parent.interface";
import { filter } from "rxjs/operators";

@Injectable()
export class NSSnackbarService {
    dynamicView$: Subject<NSSnackbarParentDataSource> = new Subject();
    constructor(private _ngZone: NgZone) { }

    get onResponse$() {
        return this.dynamicView$.pipe(
            filter(options => !options.open)
        );
    }
}
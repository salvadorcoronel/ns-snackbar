import { Component, OnInit } from "@angular/core";
import { NSSnackbarService } from "../core/ns-snackbar/ns-snackbar-parent.service";
import { NSSnackbarContentComponent } from "../core/ns-snackbar/content/ns-snackbar-content.component";
import { filter, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    private _destroy$: Subject<boolean>;
    message: string;
    constructor(private _snackbarService: NSSnackbarService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this._snackbarService.onResponse$.pipe(
            takeUntil(this.destroy$)
        ).subscribe(options => {
            if (options.response) {
                alert(`Result: ${JSON.stringify(options.response)}`);
            }
        });
    }

    openSnackbar() {
        this._snackbarService.dynamicView$.next({
            open: true,
            component: NSSnackbarContentComponent,
            viewModel: {
                // message: { title: 'This is the message' },
                message: { title: 'This is the message', titleColor: '#ffffff', backgroundColor: '#000000', borderColor: '#ffffff', borderRadius: 20 },
                duration: 3000,
                //action: { title: 'Action', titleColor: '#ffffff', backgroundColor: '#000000', borderColor: '#ffffff', borderRadius: 5 }
                action: { title: 'Action' }
            }
        });
    }

    get destroy$() {
        if (!this._destroy$) {
            this._destroy$ = new Subject();
        }
        return this._destroy$;
    }

    ngOnDestroy(): void {
        if (this._destroy$) {
            this._destroy$.next(true);
            this._destroy$.complete();
        }
    }
}

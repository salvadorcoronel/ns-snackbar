import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver } from '@angular/core';
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout";
import { Subject } from 'rxjs';
import { Page } from 'tns-core-modules/ui/page/page';
import { takeUntil, take } from 'rxjs/operators';
import { NSSnackbarService } from '../ns-snackbar-parent.service';

@Component({
  selector: 'ns-snackbar-parent',
  templateUrl: './ns-snackbar-parent.component.html'
})
export class NSSnackbarParentComponent implements OnInit {
  private _isOpenContentView: boolean = false; // to validate only one instance
  private _destroy$: Subject<boolean>;
  @ViewChild("content", {
    read: ViewContainerRef,
    static: false
  }) vcRef: ViewContainerRef;

  dynamicViewHeight: number;
  private _component: ComponentRef<any>;
  private _viewContainer: GridLayout;

  constructor(
    private _resolver: ComponentFactoryResolver,
    private _snackbarService: NSSnackbarService,
    protected _page: Page
  ) { }

  ngOnInit() {
    this._snackbarService.dynamicView$
      .pipe(takeUntil(this.destroy$))
      .subscribe(options => {
        if (options.open) {
          if (!this._isOpenContentView) {
            const compFactory = this._resolver.resolveComponentFactory(
              options.component
            );
            this._component = this.vcRef.createComponent(compFactory);
            if (options.viewModel) {
              for (const key in options.viewModel) {
                this._component.instance[key] =
                  options.viewModel[key];
              }
            }
            this._toggleDisplay(true);
          }
        } else if (this._component) {
          this.vcRef.clear();
          this._toggleDisplay(false);
        }
      });
  }

  loadedView(args) {
    this._viewContainer = args.object;
  }

  private _toggleDisplay(
    show: boolean,
    ignoreReset?: boolean
  ) {
    if (show) {
      if (!ignoreReset) {
        this._viewContainer.visibility = "visible";
      }
      this._viewContainer.opacity = 1;
      this._isOpenContentView = true;
    } else {
      this._viewContainer.visibility = "collapse";
      this._isOpenContentView = false;
    }
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

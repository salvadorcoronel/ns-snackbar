import { NSSnackbarResponse } from "../content/ns-snackbar-content.interface";

export interface NSSnackbarParentDataSource {
    open: boolean;
    component?: any;
    viewModel?: any;
    response?: NSSnackbarResponse;
}
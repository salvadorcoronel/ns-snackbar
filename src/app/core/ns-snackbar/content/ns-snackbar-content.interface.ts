export interface NSSnackbarMessage {
  title: string;
  titleColor: string;
  backgroundColor: string;
  borderColor: string;
  borderRadius: number;
}

export interface NSSnackbarActionButton {
  title: string;
  titleColor: string;
  backgroundColor: string;
  borderColor: string;
  borderRadius: number;
}

export enum NSSnackbarResultType {
  Dismissed,
  OnAction,
  Error
}

export interface NSSnackbarResponse {
  resultType: NSSnackbarResultType;
  error?: string;
}
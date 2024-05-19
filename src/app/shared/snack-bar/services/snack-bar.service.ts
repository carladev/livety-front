import { Injectable, inject } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class SnackBarService {
  private matSnackBar = inject(MatSnackBar);

  openSuccess(message: string, position?: MatSnackBarVerticalPosition): void {
    this.matSnackBar.open(message, undefined, {
      duration: 3000,
      verticalPosition: position ?? 'bottom',
      horizontalPosition: 'center',
      panelClass: 'app-snack-bar-success',
    });
  }

  openError(message: string): void {
    this.matSnackBar.open(message, undefined, {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: 'app-snack-bar-error',
    });
  }
}

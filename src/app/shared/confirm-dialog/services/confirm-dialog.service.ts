import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../containers/confirm-dialog/confirm-dialog.component';
import { Observable, map } from 'rxjs';
import { OpenConfirmDialogParams } from '../interfaces/confirm-dialog.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {
  constructor(private dialog: MatDialog) {}

  open(data: OpenConfirmDialogParams): Observable<boolean> {
    return this.dialog
      .open(ConfirmDialogComponent, { panelClass: 'ald-confirm-dialog', data })
      .afterClosed()
      .pipe(map(res => !!res));
  }
}

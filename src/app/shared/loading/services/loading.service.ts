import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { LoadingDialogComponent } from '../containers/loading-dialog/loading-dialog.component';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  opened$ = new BehaviorSubject<boolean>(false);

  get opened(): boolean {
    return this.opened$.getValue();
  }

  private matDialog = inject(MatDialog);
  private dialogRef?: MatDialogRef<LoadingDialogComponent>;

  open(): void {
    if (!this.opened) {
      this.dialogRef = this.matDialog.open(LoadingDialogComponent, {
        autoFocus: true,
        disableClose: true,
        closeOnNavigation: true
      });
      this.opened$.next(true);
    }
  }

  close(): void {
    if (this.opened) {
      this.dialogRef?.close();
      this.dialogRef = undefined;
      this.opened$.next(false);
    }
  }
}

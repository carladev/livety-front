import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-loading-dialog',
  templateUrl: './loading-dialog.component.html',
  styleUrls: ['./loading-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingDialogComponent {}

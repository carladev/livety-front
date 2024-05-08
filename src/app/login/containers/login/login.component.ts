import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  loading = signal(false);
  showError = signal(false);
  hidePassword = true;
  form = new FormGroup({
    username: new FormControl<string>('', { nonNullable: true }),
    password: new FormControl<string>('', { nonNullable: true })
  });

   private sessionService = inject(SessionService);

  onSubmit(): void {
    this.loading.set(true);
    this.showError.set(false);

    this.sessionService.login(this.form.value.username || '', this.form.value.password || '').subscribe({
      error: () => {
        this.loading.set(false);
        this.showError.set(true);
      }
    });
  }
}

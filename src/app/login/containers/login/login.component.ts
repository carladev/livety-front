import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loading = signal(false);
  showError = signal(false);
  hidePassword = true;
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.showError.set(true);
      return;
    }

    this.loading.set(true);
    this.showError.set(false);

    const { userName, password } = this.form.value;

    this.authService.login(userName, password).subscribe({
      next: (response) => {
        console.log('Logeado con exito');
        this.loading.set(false);
        this.router.navigateByUrl(`/habits`);
      },
      error: (error) => {
        console.error('Ha ocurrido un error en el login', error);
        this.showError.set(true);
        this.loading.set(false);
      },
    });
  }
}

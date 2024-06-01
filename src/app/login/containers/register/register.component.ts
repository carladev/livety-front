import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  loading = signal(false);
  showError = signal(false);
  hidePassword = true;
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group(
      {
        userName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        repeatPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator() }
    );
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      const password = formGroup.get('password');
      const repeatPassword = formGroup.get('repeatPassword');

      return password &&
        repeatPassword &&
        password.value === repeatPassword.value
        ? null
        : { passwordsMismatch: true };
    };
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.showError.set(true);
      return;
    }

    this.loading.set(true);
    this.showError.set(false);

    const { userName, email, password } = this.form.value;

    this.authService.register(userName, email, password).subscribe({
      next: (response) => {
        console.log('Registrado con exito');
        this.loading.set(false);
        this.router.navigateByUrl(`/habits`);
      },
      error: (error) => {
        console.error('Error en el reguistro', error);
        this.showError.set(true);
        this.loading.set(false);
      },
    });
  }
}

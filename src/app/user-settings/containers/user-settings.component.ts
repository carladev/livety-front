import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { UserSettingsService } from '../services/user-settings.service';
import { User } from '../models/user-interface';
import { LoadingService } from '../../shared/loading/services/loading.service';
import { SnackBarService } from '../../shared/snack-bar/services/snack-bar.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSettingsComponent {
  showError = signal(false);
  hidePassword = true;
  form: FormGroup;
  file: string = '';
  user!: User;
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private userService: UserSettingsService,
    private loading: LoadingService,
    private snackBarService: SnackBarService
  ) {
    this.form = this.fb.group(
      {
        userName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        changePassword: [false],
        password: [''],
        repeatPassword: [''],
        photo: [''],
      },
      { validators: this.passwordMatchValidator() }
    );

    this.getData();
  }

  private getData(): void {
    this.loading.open();
    this.userService.getUser().subscribe({
      next: (user: User) => {
        this.user = user;
        this.userId = user.userId;
        this.form.patchValue({
          userName: this.user.userName,
          email: this.user.email,
          changePassword: false,
          password: '',
          repeatPassword: '',
          photo: this.user.photo,
        });
        this.file = this.user.photo;
        this.loading.close();
      },
      error: () => {
        this.loading.close();
        this.snackBarService.openError(
          'Error al obtener los datos del usuario'
        );
      },
    });
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

    this.loading.open();
    this.showError.set(false);

    this.userService.updateUser(this.userId, this.form.value).subscribe({
      next: () => {
        this.snackBarService.openSuccess('Usuario actualizado con éxito');
        this.loading.close();
      },
      error: () => {
        this.snackBarService.openError('Error al actualizar el usuario');
        this.showError.set(true);
        this.loading.close();
      },
    });
  }

  onFileChange(event: any) {
    const files = event.target.files as FileList;
    if (files.length > 0) {
      const _file = URL.createObjectURL(files[0]);
      this.file = _file;
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        this.form.get('photo')?.setValue(reader.result);
        this.file = reader.result as string;
      };
    }
  }
}

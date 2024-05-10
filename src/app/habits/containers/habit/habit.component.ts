import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, forkJoin, switchMap, tap } from 'rxjs';
import { ConfirmDialogService } from '../../../shared/confirm-dialog/services/confirm-dialog.service';
import { LoadingService } from '../../../shared/loading/services/loading.service';
import {
  Frenquency,
  Habit,
  WeekDay,
} from '../../../shared/models/habit-interface';
import { SnackBarService } from '../../../shared/snack-bar/services/snack-bar.service';
import { HabitsService } from '../../services/habits.service';

@Component({
  selector: 'app-habit',
  templateUrl: './habit.component.html',
  styleUrls: ['./habit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HabitComponent implements OnInit {
  habit?: Habit;
  habitId?: number;
  form!: FormGroup;
  emojiPickerVisible: boolean = false;
  frequencies = signal<Frenquency[]>([]);
  weekDays = signal<WeekDay[]>([]);
  colors: string[] = [];
  constructor(
    private habitsService: HabitsService,
    private confirmDialogService: ConfirmDialogService,
    private snackBarService: SnackBarService,
    private loading: LoadingService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading.open();
    this.getFrequencies();
    this.getColors();
    this.getWeekDays();
    this.habitId = Number(this.activatedRoute.snapshot.params?.['habitId']);
    if (this.habitId) {
      this.getData(this.habitId);
      this.form = this.generateForm(this.habit);
    } else {
      this.form = this.generateForm();
      this.loading.close();
    }
  }

  private generateForm(habit?: Habit): FormGroup {
    this.form = this.fb.group({
      habitName: [habit?.habitName ?? null, [Validators.required]],
      color: [habit?.color ?? '#6FAAFC', [Validators.required]],
      icon: [habit?.icon ?? '😊', [Validators.required]],
      frequencyId: [habit?.frequencyId ?? null, [Validators.required]],
      weekDaysSelected: [habit?.weekDays ?? null],
      habitGoal: [habit?.habitGoal ?? 1, [Validators.required]],
      habitGoalUnit: [habit?.habitGoalUnit ?? 'veces'],
    });

    return this.form;
  }

  private getData(habitId: number): void {
    forkJoin({
      habit: this.habitsService.getHabit(habitId),
    }).subscribe((res) => {
      this.form = this.generateForm(res.habit);
      this.habit = res.habit;
      this.loading.close();
    });
  }

  private getColors(): void {
    this.habitsService.getColors().subscribe((colors) => {
      this.colors = colors.map((color) => color.color);
    });
  }
  private getFrequencies(): void {
    this.habitsService
      .getFrequencies()
      .subscribe((frequencies) => this.frequencies.set(frequencies));
  }
  private getWeekDays(): void {
    this.habitsService.getWeekDays().subscribe((weekDays) => {
      this.weekDays.set(weekDays);
    });
  }
  setColor(color: string) {
    this.form.get('color')?.setValue(color);
  }
  onEmojiSelect(event: any) {
    this.form.get('icon')?.setValue(event.emoji.native);
    this.emojiPickerVisible = false;
  }

  saveHabit(): void {
    console.log(this.form.value);
    if (this.form.valid) {
      this.loading.open();
      if (this.habit?.habitId) {
        this.habitsService
          .updateHabit(this.habit.habitId, this.form.value)
          .subscribe({
            next: () => {
              this.loading.close();
              this.snackBarService.openSuccess('Habito editado con exito');
            },
            error: () => {
              this.loading.close();
              this.snackBarService.openError('Error al editar el Habito');
            },
          });
      } else {
        this.habitsService.createHabit(this.form.value).subscribe({
          next: () => {
            this.loading.close();
            this.snackBarService.openSuccess('Habito creado con exito');
          },
          error: () => {
            this.loading.close();
            this.snackBarService.openError('Error al crear el Habito');
          },
        });
      }
    }
  }

  deleteHabit(habitId: number): void {
    this.confirmDialogService
      .open({
        title: '¿Quieres eliminar este habito?',
        message: 'Esta acción es irreversible.',
        acceptButtonLabel: 'Borrar',
        acceptButtonColor: 'warn',
      })
      .pipe(
        filter((confirm) => confirm),
        tap(() => this.loading.open()),
        switchMap(() => this.habitsService.deleteHabit(habitId))
      )
      .subscribe({
        next: () => {
          this.loading.close();
          this.router.navigate(['/habits']);
          this.snackBarService.openSuccess('Habito eliminado');
        },
        error: () => {
          this.loading.close();
          this.snackBarService.openError('Error al eliminar el Habito');
        },
      });
  }
}

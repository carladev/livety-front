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
import { SnackBarService } from '../../../shared/snack-bar/services/snack-bar.service';
import { HabitsService } from '../../services/habits.service';
import { Location } from '@angular/common';
import { Frenquency, Habit, WeekDay } from '../../models/habit-interface';

@Component({
  selector: 'app-habit',
  templateUrl: './habit.component.html',
  styleUrls: ['./habit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HabitComponent implements OnInit {
  habit?: Habit;
  habitId?: number;
  form = signal<FormGroup>({} as FormGroup);
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
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loading.open();
    this.getFrequencies();
    this.getColors();
    this.habitId = Number(this.activatedRoute.snapshot.params?.['habitId']);
    this.getWeekDays();
    this.form.set(this.generateForm());
    if (this.habitId) {
      this.getData(this.habitId);
    }
    this.loading.close();
  }

  private getData(habitId: number): void {
    forkJoin({
      habit: this.habitsService.getHabit(habitId),
    }).subscribe((res) => {
      this.habit = res.habit;
      this.form.set(this.generateForm(this.habit));
      this.loading.close();
    });
  }

  private generateForm(habit?: Habit): FormGroup {
    this.form.set(
      this.fb.group({
        habitName: [habit?.habitName ?? null, [Validators.required]],
        color: [habit?.color ?? '#6FAAFC', [Validators.required]],
        icon: [habit?.icon ?? '😊', [Validators.required]],
        frequencyId: [habit?.frequencyId ?? null, [Validators.required]],
        weekDays: [habit?.weekDays ?? this.weekDays()],
        habitGoal: [habit?.habitGoal ?? 1, [Validators.required]],
        habitGoalUnit: [habit?.habitGoalUnit ?? 'veces'],
      })
    );

    return this.form();
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
    this.habitsService
      .getWeekDays(this.habitId ? this.habitId : 0)
      .subscribe((weekDays) => {
        this.weekDays.set(weekDays);
      });
  }
  setColor(color: string) {
    this.form().get('color')?.setValue(color);
  }
  onEmojiSelect(event: any) {
    this.form().get('icon')?.setValue(event.emoji.native);
    this.emojiPickerVisible = false;
  }

  toggleWeekDaySelection(weekDay: WeekDay): void {
    weekDay.selected = !weekDay.selected;
    this.weekDays.set(this.weekDays());
    this.form().get('weekDays')?.setValue(this.weekDays());
  }

  saveHabit(): void {
    if (this.form().valid) {
      this.loading.open();
      if (this.habit?.habitId) {
        this.habitsService
          .updateHabit(this.habit.habitId, this.form().value)
          .subscribe({
            next: () => {
              this.loading.close();
              this.snackBarService.openSuccess('Habito editado con exito');
              this.router.navigate(['/habits']);
            },
            error: () => {
              this.loading.close();
              this.snackBarService.openError('Error al editar el Habito');
            },
          });
      } else {
        this.habitsService.createHabit(this.form().value).subscribe({
          next: () => {
            this.loading.close();
            this.snackBarService.openSuccess('Habito creado con exito');
            this.router.navigate(['/habits']);
          },
          error: () => {
            this.loading.close();
            this.snackBarService.openError('Error al crear el habito');
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

  onBack(): void {
    this.location.back();
  }
}

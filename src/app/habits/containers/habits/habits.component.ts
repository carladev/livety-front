import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { HabitsService } from '../../services/habits.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { addDays, subDays } from 'date-fns';
import { Router } from '@angular/router';
import { SnackBarService } from '../../../shared/snack-bar/services/snack-bar.service';
import { Habit } from '../../models/habit-interface';
@Component({
  selector: 'app-habits',
  templateUrl: './habits.component.html',
  styleUrl: './habits.component.scss',
})
export class HabitsComponent implements OnInit {
  habits = signal<Habit[]>([]);
  habitsDateFilterForm = this.generateForm();
  private destroyRef = inject(DestroyRef);

  constructor(
    private habitsService: HabitsService,
    private fb: FormBuilder,
    private router: Router,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit() {
    this.getHabits().subscribe((res) => {
      if (!res.length) {
        this.router.navigate(['/start']);
      }
      this.habits.set(res);
    });
  }
  addDay(): void {
    this.habitsDateFilterForm.patchValue({
      habitDate: addDays(
        this.habitsDateFilterForm.value.habitDate || new Date(),
        1
      ),
    });
  }
  removeDay(): void {
    this.habitsDateFilterForm.patchValue({
      habitDate: subDays(
        this.habitsDateFilterForm.value.habitDate || new Date(),
        1
      ),
    });
  }
  private getHabits(): Observable<Habit[]> {
    const value = this.habitsDateFilterForm.value;

    return this.habitsService.getHabits(value.habitDate || new Date()).pipe(
      tap((habits: Habit[]) => {
        this.habits.set(habits);
      })
    );
  }

  private generateForm(): FormGroup<{ habitDate: FormControl<Date> }> {
    const form = this.fb.nonNullable.group({
      habitDate: [new Date()],
    });

    form.valueChanges
      .pipe(
        switchMap(() => this.getHabits()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();

    return form;
  }

  newHabit(): void {
    this.router.navigateByUrl(`/new-habit`);
  }

  editHabit(habitId: number): void {
    this.router.navigateByUrl(`/edit-habit/${habitId}`);
  }

  removeHabitRecord(habit: Habit): void {
    this.habitsService
      .addHabitRecord(
        habit.habitId,
        habit.record - 1,
        this.habitsDateFilterForm.get('habitDate')?.value || new Date()
      )
      .subscribe({
        next: () => {
          this.getHabits().subscribe((res) => {
            this.habits.set(res);
          });
          this.snackBarService.openSuccess('Registro de habito actualizada');
        },
        error: () => {
          this.snackBarService.openError(
            'Error al actualizar el registro del habito'
          );
        },
      });
  }

  addHabitRecord(habit: Habit): void {
    this.habitsService
      .addHabitRecord(
        habit.habitId,
        habit.record + 1,
        this.habitsDateFilterForm.get('habitDate')?.value || new Date()
      )
      .subscribe({
        next: () => {
          this.getHabits().subscribe((res) => {
            this.habits.set(res);
          });
          this.snackBarService.openSuccess('Registro de habito actualizada');
        },
        error: () => {
          this.snackBarService.openError(
            'Error al actualizar el registro del habito'
          );
        },
      });
  }

  completeHabitRecord(habit: Habit): void {
    this.habitsService
      .addHabitRecord(
        habit.habitId,
        habit.habitGoal,
        this.habitsDateFilterForm.get('habitDate')?.value || new Date()
      )
      .subscribe({
        next: () => {
          this.getHabits().subscribe((res) => {
            this.habits.set(res);
          });
          this.snackBarService.openSuccess('Registro de habito actualizada');
        },
        error: () => {
          this.snackBarService.openError(
            'Error al actualizar el registro del habito'
          );
        },
      });
  }
}

import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import {  Habit } from '../../shared/interfaces/habit-interface';
import { HabitsService } from '../services/habits.service';
import { FormBuilder, FormControl, FormGroup  } from '@angular/forms';
import { Observable, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { addDays, subDays } from 'date-fns';
@Component({
  selector: 'app-habits',
  templateUrl: './habits.component.html',
  styleUrl: './habits.component.scss'
})

export class HabitsComponent implements OnInit {

  habits = signal<Habit[]>([]);
  habitsDateFilterForm = this.generateForm();
  private destroyRef = inject(DestroyRef);

  constructor(private habitsService: HabitsService, private fb: FormBuilder) { }

  ngOnInit() {
    this.getHabits().subscribe(res => {
      this.habits.set(res);
    });
  }
   addDay(): void {
   
    this.habitsDateFilterForm.patchValue({
      habitDate: addDays(this.habitsDateFilterForm.value.habitDate || new Date(), 1)
    });
  }
  removeDay(): void {
    this.habitsDateFilterForm.patchValue({
      habitDate: subDays(this.habitsDateFilterForm.value.habitDate || new Date(), 1)
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
      habitDate: [new Date()]
    });

    form.valueChanges
      .pipe(
        switchMap(() => this.getHabits()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();

    return form;
  }
   
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Habit } from '../../models/habit-interface';

@Component({
  selector: 'app-habits-list',
  templateUrl: './habits-list.component.html',
  styleUrl: './habits-list.component.scss',
})
export class HabitsListComponent {
  @Input() habits: Habit[] = [];
  @Output() duplicateHabit = new EventEmitter<number>();
  @Output() editHabit = new EventEmitter<number>();
  @Output() deleteHabit = new EventEmitter<number>();
  @Output() addHabitRecord = new EventEmitter<Habit>();
  @Output() completeHabitRecord = new EventEmitter<Habit>();

  getProgress(habit: any): number {
    if (!habit.habitGoal || habit.habitGoal === 0) {
      return 0;
    }
    return (habit.record / habit.habitGoal) * 100;
  }
}

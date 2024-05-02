import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Habit } from '../../../shared/interfaces/habit-interface';

@Component({
  selector: 'app-habits-list',
  templateUrl: './habits-list.component.html',
  styleUrl: './habits-list.component.scss',
})
export class HabitsListComponent  {
  @Input() habits: Habit[] = [];
  @Output() duplicateHabit = new EventEmitter<number>();
  @Output() editHabit = new EventEmitter<number>();
  @Output() deleteHabit = new EventEmitter<number>();


   
}

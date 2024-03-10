import { Component } from '@angular/core';
import { Habit } from '../interfaces/habit-interface';

@Component({
  selector: 'app-habits',
  templateUrl: './habits.component.html',
  styleUrl: './habits.component.css'
})
export class HabitsComponent {
  habit: Habit = {
    id: 1,
    name: 'Limpiar'
  };
}

import { Component, OnInit, importProvidersFrom } from '@angular/core';
import { DailyDate, Habit } from '../../interfaces/habit-interface';
import { HabitsService } from './habits.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-habits',
  templateUrl: './habits.component.html',
  styleUrl: './habits.component.css'
})

export class HabitsComponent implements OnInit {
  habits: Habit[] = [];
  dailyDates: DailyDate[] = [];
  habitForm!: FormGroup;
  date = new FormControl(new Date());
  constructor(private habitsService: HabitsService, private fb: FormBuilder) { }

  ngOnInit() {
    this.habitForm = this.fb.group({
      date: [null, Validators.required] // You can set default value if needed
    });
  }
    
   
}

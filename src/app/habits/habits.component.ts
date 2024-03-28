import { Component, OnInit, importProvidersFrom } from '@angular/core';
import { DailyDate, Habit } from '../interfaces/habit-interface';
import { HabitsService } from './habits.service';
@Component({
  selector: 'app-habits',
  templateUrl: './habits.component.html',
  styleUrl: './habits.component.css',
})

export class HabitsComponent implements OnInit {
  habits: Habit[] = [];
  dailyDates: DailyDate[] = [];
  constructor(private habitsService: HabitsService) { }

  ngOnInit() {
   
  this.getDates();
    this.habitsService.getHabits().subscribe(res =>{
      this.habits = res
    })
  }

  getDates() {
    const currentDate = new Date();
    const pastDate = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000); // 30 days less than now
    const futureDate = new Date(currentDate.getTime() + 60 * 24 * 60 * 60 * 1000); // 60 days more than now

    for (let date = new Date(pastDate); date <= futureDate; date.setDate(date.getDate() + 1)) {
      const formattedDate = new Date(date);
      const isToday = formattedDate.toDateString() === currentDate.toDateString();
      
      this.dailyDates.push({
        date: formattedDate,
        weekday: formattedDate.toLocaleDateString('en-us', { weekday: 'short' }).toUpperCase(),
        longWeekday: formattedDate.toLocaleDateString('en-us', { weekday: 'long' }),
        day: formattedDate.getDate(),
        month: formattedDate.toLocaleDateString('en-us', { month: 'long' }),
        year: formattedDate.getFullYear().toString(),
        selectedDay: isToday
      });
    }
  }


    
   
}

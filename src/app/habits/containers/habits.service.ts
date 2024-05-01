import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Habit } from '../../interfaces/habit-interface';

@Injectable({
  providedIn: 'root'
})
export class HabitsService {

  constructor(private http: HttpClient) { }
  getHabits() {
    return this.http.get<any[]>('http://localhost:8888/user-habits/all');
  }

  addHabit(habit: Habit) {
    console.log(habit);
    return this.http.post<any>('http://localhost:8888/user-habits/add', habit);
  }
}

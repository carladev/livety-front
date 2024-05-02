import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Habit } from '../../shared/interfaces/habit-interface';
import { format } from "date-fns";

@Injectable({
  providedIn: 'root'
})
export class HabitsService {

  constructor(private http: HttpClient) { }
  getHabits(habitDate: Date) {
    let params = new HttpParams();
    params = params.set('date', format(habitDate, 'yyyyMMdd'));
    return this.http.get<any[]>('http://localhost:8888/user-habits/all');
  }

  addHabit(habit: Habit) {

    return this.http.post<any>('http://localhost:8888/user-habits/add', habit);
  }
}

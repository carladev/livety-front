import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Frenquency, Habit } from '../../shared/models/habit-interface';
import { format } from 'date-fns';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HabitsService {
  private readonly habitsAPI = 'http://localhost:8888/habits';
  private readonly habitAPI = 'http://localhost:8888/habit';
  constructor(private http: HttpClient) {}
  getHabits(habitDate: Date) {
    let params = new HttpParams();
    params = params.set('date', format(habitDate, 'yyyyMMdd'));
    return this.http.get<any[]>(`${this.habitsAPI}`);
  }

  getFrequencies() {
    return this.http.get<Frenquency[]>(`${this.habitsAPI}/frequencies`);
  }

  getColors() {
    return this.http.get<any[]>(`${this.habitsAPI}/colors`);
  }
  getWeekDays() {
    return this.http.get<any[]>(`${this.habitsAPI}/week-days`);
  }

  getHabit(habitId: number) {
    return this.http.get<Habit>(`${this.habitsAPI}/${habitId}`);
  }

  updateHabit(habitId: number, habit: Habit): Observable<void> {
    return this.http.post<void>(`${this.habitsAPI}/update/${habitId}`, {
      habit,
    });
  }

  createHabit(habit: Habit): Observable<void> {
    console.log(habit);
    return this.http.post<void>(`${this.habitAPI}`, { habit });
  }

  deleteHabit(habitId: number): Observable<void> {
    return this.http.post<void>(`${this.habitAPI}/delelte/${habitId}`, {});
  }
}

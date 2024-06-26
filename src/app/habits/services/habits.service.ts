import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import { Observable } from 'rxjs';
import { Frenquency, Habit } from '../models/habit-interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HabitsService {
  private apiUrl = environment.apiUrl;

  private readonly habitsAPI = `${this.apiUrl}/habits`;
  private readonly habitAPI = `${this.apiUrl}/habit`;

  constructor(private http: HttpClient) {}
  getHabits(habitDate: Date) {
    let params = new HttpParams();
    params = params.set('date', format(habitDate, 'yyyy-MM-dd'));
    return this.http.get<any[]>(`${this.habitsAPI}`, { params });
  }

  getFrequencies() {
    return this.http.get<Frenquency[]>(`${this.habitsAPI}/frequencies`);
  }

  getColors() {
    return this.http.get<any[]>(`${this.habitsAPI}/colors`);
  }
  getWeekDays(habitId: number) {
    return this.http.get<any[]>(`${this.habitsAPI}/week-days/${habitId}`);
  }

  getHabit(habitId: number) {
    return this.http.get<Habit>(`${this.habitAPI}/${habitId}`);
  }

  updateHabit(habitId: number, habit: Habit): Observable<void> {
    return this.http.post<void>(`${this.habitAPI}/update/${habitId}`, {
      ...habit,
    });
  }

  createHabit(habit: Habit): Observable<void> {
    return this.http.post<void>(`${this.habitAPI}`, { ...habit });
  }

  deleteHabit(habitId: number): Observable<void> {
    return this.http.post<void>(`${this.habitAPI}/delete/${habitId}`, {});
  }

  addHabitRecord(
    habitId: number,
    record: number,
    date: Date
  ): Observable<void> {
    const recordDate = format(date, 'yyyy-MM-dd');

    return this.http.post<void>(`${this.habitAPI}/record`, {
      habitId,
      record,
      recordDate,
    });
  }
}

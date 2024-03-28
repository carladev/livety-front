import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HabitsService {

  constructor(private http: HttpClient) { }
  getHabits() {
    return this.http.get<any[]>('http://localhost:8888/user-habits/all');
  }
}

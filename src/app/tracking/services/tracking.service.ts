import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TrackingService {
  private apiUrl = environment.apiUrl;
  private readonly weeklyTrackingAPI = `${this.apiUrl}weekly-tracking`;
  private readonly monthlyTrackingAPI = `${this.apiUrl}monthly-tracking`;

  constructor(private http: HttpClient) {}
  getWeeklyTracking(weekNumber: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.weeklyTrackingAPI}/${weekNumber}`);
  }

  getMonthlyTracking(monthNumber: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.monthlyTrackingAPI}/${monthNumber}`);
  }
}

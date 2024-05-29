import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrackingService {
  private readonly weeklyTrackingAPI = '/api/weekly-tracking';

  constructor(private http: HttpClient) {}
  getWeeklyTracking(weekNumber: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.weeklyTrackingAPI}/${weekNumber}`);
  }
}

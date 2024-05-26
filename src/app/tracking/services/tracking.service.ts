import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TrackingService {
  private readonly weeklyTrackingAPI = '/api/weekly-tracking';

  constructor(private http: HttpClient) {}
  getWeeklyTracking(weekNumber: number) {
    let params = new HttpParams();
    params = params.set('weekNumber', weekNumber);
    console.log('ooo', weekNumber);
    return this.http.get<any[]>(`${this.weeklyTrackingAPI}`, { params });
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user-interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsService {
  private apiUrl = environment.apiUrl;
  private readonly userAPI = `${this.apiUrl}/user`;
  private readonly updateUserAPI = `${this.apiUrl}/update-user`;

  constructor(private http: HttpClient) {}
  getUser(): Observable<User> {
    return this.http.get<User>(`${this.userAPI}`);
  }

  updateUser(userId: number, userData: User): Observable<void> {
    return this.http.post<void>(`${this.updateUserAPI}/${userId}`, userData);
  }
}

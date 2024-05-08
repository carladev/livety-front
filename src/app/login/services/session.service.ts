import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {


login(username: string, password: string): Observable<any> {

  return new Observable((observer) => {
    setTimeout(() => {
      observer.next({ username, password });
      observer.complete();
    }, 1000);
  });
}

  // constructor(
  //   private accessService: AccessService,
  //   private router: Router
  // ) {}

  // login(username: string, password: string): Observable<LoginResponse> {
  //   return this.accessService.login({ username, password }, { authType: 'local', navigate: false }).pipe(
  //     tap(() => {
  //       this.router.navigateByUrl('/orders');
  //     })
  //   );
  // }

  // logout(): void {
  //   this.accessService
  //     .logout({
  //       navigate: false
  //     })
  //     .subscribe({
  //       next: () => {
  //         this.router.navigateByUrl('/login');
  //       }
  //     });
  // }
}

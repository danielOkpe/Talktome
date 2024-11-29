import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from './user';
import { catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);

  constructor() {}

  getAllUsers() {
    return this.http.get<User[]>('http://localhost:8080/users').pipe(
      tap((response: any) => console.table(response)),
      catchError((error) => {
        console.log(error);
        return of([]);
      })
    );
  }

}

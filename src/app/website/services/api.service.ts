import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://myportfolioapi.test/api';

  constructor(private http: HttpClient) {}

  getUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/juandiegows`);
  }

  getServices(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/juandiegows/services`);
  }
  getClients(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/juandiegows/clients`);
  }
}

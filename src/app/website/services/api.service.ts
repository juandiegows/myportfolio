import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/juandiegows`);
  }

  getServices(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/juandiegows/services`);
  }

  getClients(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/juandiegows/clients`);
  }
}

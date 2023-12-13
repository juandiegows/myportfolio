import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://myportfolioapi.test/api'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) { }

  // Ejemplo de una solicitud GET
  getUser(): Observable<any> {

    return this.http.get<any>(`${this.apiUrl}/users/juandiegows`);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Message } from '../models/Message.model';
import { Event } from '../models/Event.model';
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

  getSkills(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/juandiegows/skills`);
  }

  getOutstandingAchievements(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/juandiegows/outstanding-achievements`);
  }

  getWorks(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/juandiegows/works`);
  }

  getEvents(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/juandiegows/events`);
  }


  getEducations(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/juandiegows/educations`);
  }

  getProjects(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/juandiegows/projects`);
  }

  getPosts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/juandiegows/posts`);
  }

  sendMessage(message: Message) {
    return this.http.post<any>(`${this.apiUrl}/message`, message, {observe: 'response'});
   }

   getVisit(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/visit`);
  }

}

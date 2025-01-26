import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuhtService } from './auht-service.service';
import { environment } from '../../environment/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private authService: AuhtService
  ) { }

  getUser(): Observable<any> {
    const token = this.authService.getToken();
    return this.http.get(`${this.apiUrl}/User/GetUser`,
      { headers: { Authorization: `Bearer ${token}` } });
  }
}

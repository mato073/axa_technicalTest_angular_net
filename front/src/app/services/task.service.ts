import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuhtService } from './auht-service.service';
import { Task, NewTask } from '../types/task.model';

import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private authService: AuhtService,
  ) { }

  private handelDate(date: string) {
    const ddMMyyyyRegex = /^\d{2}\/\d{2}\/\d{4}$/; // Matches DD/MM/YYYY
    const yyyyMMddRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (ddMMyyyyRegex.test(date)) {
      const [day, month, year] = date.split('/').map(Number);
      const newtdate = new Date(Date.UTC(year, month, day, 10, 13, 56, 51));
      console.log(newtdate)
      const formattedDate = newtdate.toISOString();

      return formattedDate
    } else if (yyyyMMddRegex.test(date)) {
      const [year, month, day] = date.split('-').map(Number);
      const newtdate = new Date(Date.UTC(year, month, day, 10, 13, 56, 51));
      console.log(newtdate)
      const formattedDate = newtdate.toISOString();
      return formattedDate
    }
    return '31/01/2025'
  }

  getAllTasks(): Observable<any> {
    const token = this.authService.getToken();
    return this.http.get(`${this.apiUrl}/Task/GetUserAllTasks`,
      { headers: { Authorization: `Bearer ${token}` } });
  }

  deleteTask(taskId: number): Observable<any> {
    const token = this.authService.getToken();
    return this.http.delete(`${this.apiUrl}/Task/DeleteTask/${taskId}`,
      { headers: { Authorization: `Bearer ${token}` } });
  }

  postNewTask(newTask: NewTask): Observable<any> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/Task/CreateTask`, newTask, { headers });
  }

  updateTask(task: Task): Observable<any> {
    const token = this.authService.getToken();
    const { userId, dueDate, ...rest } = task;
    const newFormatedDate = this.handelDate(dueDate)
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put(`${this.apiUrl}/Task/UpdateTask`, { dueDate: newFormatedDate, ...rest }, { headers });
  }
}



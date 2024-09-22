import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, CreateTask, UpdateTask, TaskResponse } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = "api/tasks";

  constructor(private http: HttpClient) { }

  getTasks(): Observable<TaskResponse> {
    return this.http.get<TaskResponse>(this.apiUrl);
  }

  getTask(id: number): Observable<Task> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Task>(url);
  }

  createTask(createTask: CreateTask): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, createTask);
  }

  updateTask(id: number, updateTask: UpdateTask): Observable<Task> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<Task>(url, updateTask);
  }

  completeTask(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}/complete`;
    return this.http.post<void>(url, null);
  }

  deleteTask(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}

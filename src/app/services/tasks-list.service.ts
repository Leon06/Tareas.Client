import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { PagedTasksResponse } from '../models/pagedTasksResponse.model';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class TasksListService {

  private readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllTask():Observable<Task[]>{
    return this.http.get<Task[]>(`${this.baseUrl}/GetAllTask/`)
  }

  editTask(task: Task):Observable<Task>{
    return this.http.put<Task>(`${this.baseUrl}/UpdateTask`, task)
  }

  saveTask(task: Task): Observable<Task> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Task>(`${this.baseUrl}/CreateTask`, task, { headers: headers });
  }

  deleteTaskById(taskId: string):Observable<string>{
    return this.http.delete<string>(`${this.baseUrl}/DeleteTask?id=${taskId}`);
  }
  
  getPagedTasks(pageIndex: number, pageSize: number): Observable<PagedTasksResponse> {
    const params = new HttpParams()
        .set('pageIndex', pageIndex.toString())
        .set('pageSize', pageSize.toString());
        
    return this.http.get<PagedTasksResponse>(`${this.baseUrl}/GetPagedTasks`, { params: params });
  }

}

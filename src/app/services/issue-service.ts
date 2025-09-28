import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Issue } from '../models/issue.model';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private baseUrl = 'api/issues'; // in-memory-web-api serves /api/* by default

  constructor(private http: HttpClient) { }


  /** Fetch all issues */
  getAll(): Observable<Issue[]> {
    return this.http.get<Issue[]>(this.baseUrl);
  }

  /** Add a new issue */
  add(issue: Partial<Issue>): Observable<Issue> {
    return this.http.post<Issue>(this.baseUrl, issue);
  }

  /** Update an existing issue */
  update(issue: Issue): Observable<Issue> {
    return this.http.put<Issue>(`${this.baseUrl}/${issue.id}`, issue);
  }

  /** Delete an issue */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

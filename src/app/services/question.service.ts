import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Question {
  queId: number;
  language: string;
  topic: string;
  level: string;
  question: string;
  answer: string;
}

export interface PaginatedQuestions {
  content: Question[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private baseUrl = 'http://localhost:8080/api/questions';

  constructor(private http: HttpClient) {}

  getLanguages(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/getAllLanguages`);
  }

  getTopics(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/getAllTopics`);
  }

  getDynamicTopics(language: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/getTopics?language=${language}`);
  }

  setQuestions(question: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addQ`, question);
  }

  getQuestionById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  updateQuestion(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteQuestion(id: number):Observable<any>{
  return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  getFilteredQuestions(language: string, topic: string, level: string, page: number = 0, size: number = 5): Observable<PaginatedQuestions> {
    let params = new HttpParams()
      .set('language', language || '')
      .set('topic', topic || '')
      .set('level', level || '')
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PaginatedQuestions>(`${this.baseUrl}/filter`, { params });
  }

  searchQuestions(query: string, page: number = 0, size: number = 5): Observable<PaginatedQuestions> {
  const params = new HttpParams()
    .set('query', query)
    .set('page', page.toString())
    .set('size', size.toString());

  return this.http.get<PaginatedQuestions>(`${this.baseUrl}/search`, { params });
}

 private questionIdSource = new BehaviorSubject<number | null>(null);
  questionId$ = this.questionIdSource.asObservable();

  setQuestionId(id: number) {
    this.questionIdSource.next(id);
  }
}
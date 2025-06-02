import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
   private alertSubject = new BehaviorSubject<string>('');  // ✅ initialized as empty
  public alerts$: Observable<string> = this.alertSubject.asObservable(); 

  // Observable for components to subscribe to
  getAlert(): Observable<string> {
    return this.alertSubject.asObservable();
  }

  // Trigger a new alert message
  showAlert(message: string) {
    this.alertSubject.next(message);
  }

  // Optionally add clear method
  clear() {
    this.alertSubject.next('');
  }
}

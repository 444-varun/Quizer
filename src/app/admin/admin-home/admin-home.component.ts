import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent {

  constructor(private router: Router) {}

  // Questions
  navigateToAddQuestion() {
    this.router.navigate(['/admin/add-question']);
  }

  navigateToViewQuestions() {
    this.router.navigate(['/home']);
  }

  // Exams
  navigateToAddExam() {
    this.router.navigate(['/admin/add-exam']);
  }

  navigateToViewExams() {
    this.router.navigate(['/admin/exams']);
  }

  navigateToUpdateQuestions(){
    this.router.navigate(["/admin/update-questionList"])
  }


}

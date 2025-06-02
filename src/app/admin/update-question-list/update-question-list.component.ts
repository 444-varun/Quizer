import { Component, OnInit } from '@angular/core';
import { QuestionService, Question } from 'src/app/services/question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-question-list',
  templateUrl: './update-question-list.component.html',
  styleUrls: ['./update-question-list.component.scss']
})
export class UpdateQuestionListComponent implements OnInit {
  query: string = '';
  questions: Question[] = [];
  page: number = 0;
  size: number = 5;
  totalPages: number = 0;

  constructor(private questionService: QuestionService, private router: Router) {}

  ngOnInit(): void {
    // Optionally, load default questions here
  }

  search(): void {
    this.page = 0;
    this.fetchResults();
  }

  fetchResults(): void {
    this.questionService.searchQuestions(this.query, this.page, this.size).subscribe({
      next: (data) => {
        this.questions = data.content;
        this.totalPages = data.totalPages;
      },
      error: (err) => {
        console.error('Error fetching questions:', err);
      }
    });
  }
  // deleteQue(id: number){
  //   console.log(id);
  //   this.questionService.deleteQuestion(id);
  //     alert("Question has been deleted ?");
  // }

deleteQue(id: number): void {
  if (confirm('Are you sure you want to delete this question?')) {
    this.questionService.deleteQuestion(id).subscribe({
      next: () => {
        alert('Question deleted successfully');
        this.search(); // re-fetch updated list
      },
      error: (err) => {
        console.error('Delete failed:', err);
        alert('Could not delete question');
      }
    });
  }
}

  goToUpdate(id: number): void {
    this.router.navigate(['/admin/update-question']);
    this.questionService.setQuestionId(id);

  }

  nextPage(): void {
    if (this.page + 1 < this.totalPages) {
      this.page++;
      this.fetchResults();
    }
  }

  prevPage(): void {
    if (this.page > 0) {
      this.page--;
      this.fetchResults();
    }
  }

  goBack(){
    this.router.navigate(['/admin'])
  }
}

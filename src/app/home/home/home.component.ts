// src/app/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { QuestionService, Question } from 'src/app/services/question.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  questions: Question[] = [];

  languages: string[] =[];
  topics: string[] = [];
  levels: string[] = ['Easy', 'Medium', 'Hard'];

  selectedLanguage = '';
  selectedTopic = '';
  selectedLevel = '';

  currentPage = 0;  // backend pages are zero-based
  totalPages = 0;
  loading = false;

  questionsPerPage = 5;

  constructor(private questionService: QuestionService, private userService:UserServiceService, private route:Router ) {}

  ngOnInit(): void {
    this.loadLanguages();
    this.loadTopics();
  }
  loadLanguages():void{
    this.questionService.getLanguages().subscribe({
      next:(language) => this.languages=language.sort(),
      error:(err) => console.log("Failed to load Languages",err)
    })
  }

  onLanguageChange():void{
    this.selectedTopic = '';
    this.topics = [];
    if(this.selectedLanguage){
    this.questionService.getDynamicTopics(this.selectedLanguage).subscribe({
      next:(dynTopic) => this.topics=dynTopic.sort(),
      error:(err) => console.log("Failed to load Dynamic Topics based on language",err)
    })
    }

  }


  loadTopics():void{
    this.questionService.getTopics().subscribe({
      next:(topic) => this.topics=topic.sort(),
      error:(err) => console.log("Failed to Load Topics",err)
    })
  }

  onFilterSubmit(): void {
    this.currentPage = 0; // reset to first page on filter
    this.fetchQuestions();
  }

  resetFilters(): void {
    this.selectedLanguage = '';
    this.selectedTopic = '';
    this.selectedLevel = '';
    this.questions = [];
    this.totalPages = 0;
    this.currentPage = 0;
  }

  fetchQuestions(): void {
    this.loading = true;

    this.questionService.getFilteredQuestions(
      this.selectedLanguage,
      this.selectedTopic,
      this.selectedLevel,
      this.currentPage,
      this.questionsPerPage
    ).subscribe({
      next: (data) => {
        this.questions = data.content;
        this.totalPages = data.totalPages;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching questions:', err);
        this.loading = false;
      }
    });
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.fetchQuestions();
    }
  }

  nextPage(): void {
    if (this.currentPage + 1 < this.totalPages) {
      this.currentPage++;
      this.fetchQuestions();
    }
  }

  goBack(){
    if(this.userService.isAdmin()){
      this.route.navigate(['/admin'])
    }else if(this.userService.isUser()){
      this.route.navigate(['/auth/login'])
    } 
  }
}

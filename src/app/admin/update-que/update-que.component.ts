import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Question, QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-update-que',
  templateUrl: './update-que.component.html',
  styleUrls: ['./update-que.component.scss']
})
export class UpdateQueComponent {
      updateForm!: FormGroup;
  questionId!: number;

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize form group matching your HTML controls
    this.updateForm = this.fb.group({
      language: ['', Validators.required],
      topic: ['', Validators.required],
      level: ['', Validators.required],
      question: ['', Validators.required],
      answer: ['', Validators.required]
    });

    // Subscribe to questionId from service
    this.questionService.questionId$.subscribe(id => {
      if (id !== null) {
        this.questionId = id;
        this.questionService.getQuestionById(id).subscribe({
          next: (data) => {
            // Patch form controls with fetched data
            this.updateForm.patchValue({
              language: data.language,
              topic: data.topic,
              level: data.level,
              question: data.question,
              answer: data.answer
            });
          },
          error: (err) => {
            console.error('Error loading question:', err);
          }
        });
      } else {
        console.warn('No question ID found');
      }
    });
  }

  onSubmit(): void {
    if (this.updateForm.valid) {
      this.questionService.updateQuestion(this.questionId, this.updateForm.value).subscribe({
        next: () => {
          alert('Question updated successfully');
          this.router.navigate(['/admin/update-questionList']);
        },
        error: (err) => {
          console.error('Update failed:', err);
        }
      });
    }
  }

  goBack(){
    this.router.navigate(['/admin/update-questionList'])
  }
}


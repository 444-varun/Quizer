import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-add-que',
  templateUrl: './add-que.component.html',
  styleUrls: ['./add-que.component.scss']
})
export class AddQueComponent {
 questionForm: FormGroup;

  constructor(private fb: FormBuilder , private questionService: QuestionService , private router: Router) {
    this.questionForm = this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required],
      topic: ['', Validators.required],
      language: ['', Validators.required],
      level: ['EASY', Validators.required],
    });
  }

  onSubmit() {
    if (this.questionForm.valid) {
      console.log('Submitting Question:', this.questionForm.value);
     this.questionService.setQuestions(this.questionForm.value).subscribe({
      next:(res) => {alert("Question Saved!");
                  this.questionForm.reset();
      }, error:(err) => {console.log("Failed to save the Question " , err)}
     })
      // Later: call service to save to backend
    }
  }

  goBack(){
    this.router.navigate(['/admin'])
  }
}

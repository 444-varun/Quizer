import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminHomeRoutingModule } from './admin-home-routing.module';
import { AdminHomeComponent } from './admin-home.component';
import { AddQueComponent } from '../add-que/add-que.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateQueComponent } from '../update-que/update-que.component';
import { UpdateQuestionListComponent } from '../update-question-list/update-question-list.component';


@NgModule({
  declarations: [
    AdminHomeComponent,
    AddQueComponent,
    UpdateQueComponent,
     UpdateQuestionListComponent
  ],
  imports: [
    CommonModule,
    AdminHomeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
   exports: [AdminHomeComponent]
})
export class AdminHomeModule { }

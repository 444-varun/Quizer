import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home.component';
import { AddQueComponent } from '../add-que/add-que.component';
import { AdminLayoutComponent } from '../admin-layout/admin-layout.component';
import { UpdateQueComponent } from '../update-que/update-que.component';
import { UpdateQuestionListComponent } from '../update-question-list/update-question-list.component';
import { AuthGuard } from 'src/app/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate:[AuthGuard],
    children: [
      { path: '', component: AdminHomeComponent },
      { path: 'add-question', component: AddQueComponent },
      { path: 'update-question', component: UpdateQueComponent},
      { path: 'update-questionList', component: UpdateQuestionListComponent}
      // You can nest or organize routes as needed
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminHomeRoutingModule { }

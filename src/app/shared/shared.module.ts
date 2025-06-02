// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CardComponent } from './card/card.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { AlertComponent } from './alert/alert.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    CardComponent,
    SpinnerComponent,
    AlertComponent,
    FooterComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    AlertComponent,
    SpinnerComponent,
    CardComponent,
    FooterComponent,
    NavbarComponent,
    FormsModule
  ]
})
export class SharedModule { }

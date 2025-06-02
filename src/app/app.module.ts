// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';

import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';


@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    AdminLayoutComponent,
   
  // Only declare components unique to AppModule here
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,      // SharedModule now includes Footer, Navbar, Alert, etc.
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

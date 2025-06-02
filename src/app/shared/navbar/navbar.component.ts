import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit  {

showProfileOrHome: 'profile' | 'home' = 'profile';
  showExamOrHome: 'exam' | 'home' = 'exam';

  constructor(private router: Router , private authService:AuthService) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Profile page toggle
        this.showProfileOrHome = event.url.includes('/profile') ? 'home' : 'profile';

        // Exam page toggle
        this.showExamOrHome = event.url.includes('/exam') ? 'home' : 'exam';
      }
    });
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  logout(){
    this.authService.isLogout();
  }

}


  
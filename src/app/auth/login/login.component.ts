import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { decodeToken } from 'src/app/Utils/jwt-utils';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

 username: string = '';
  password: string = '';
  payload : any = '';

  constructor(private authService: AuthService,
     private router: Router,
     private alertService: AlertService,
     private userService:UserServiceService
     ) {}

onLogin(): void {
  this.authService.login(this.username, this.password).subscribe({
    next: (response: { jwt: string }) => {
      this.authService.storeToken(response.jwt); // <-- changed this line
      this.payload = decodeToken(response.jwt)
      this.userService.setPayload(this.payload);
      if(this.payload.role === "ROLE_USER"){
         this.router.navigate(['/home']);
      }else if(this.payload.role === "ROLE_ADMIN"){
         this.router.navigate(['/admin'])
      }else{
        this.alertService.showAlert("Unknown User");
      } 
    },
    error: (err: any) => {
      console.error('Login failed:', err);
      this.alertService.showAlert('Login failed! Try again.');
    }
  });
}

  skipLogin(): void {
    this.router.navigate(['/home']);
  }

}

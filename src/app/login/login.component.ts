import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    console.log('Login button clicked');
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    this.authService.login(this.email, this.password).subscribe({
      next: (data) => {
        console.log('Login successful', data);
        localStorage.setItem('access_token', data.token.access);
        localStorage.setItem('refresh_token', data.token.refresh);
        this.router.navigate(['/']);  // Navigate to the dashboard or home page
      },
      error: (error) => {
        console.log('Login failed', error);
        this.errorMessage = 'Invalid email or password';
      }
    });
  }
}

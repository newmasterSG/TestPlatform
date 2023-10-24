import { Component } from '@angular/core';
import { AuthService } from '../Auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  loginForm = {
    email: '',
    password: '',
  };

  onSubmit() {
    this.authService.login(this.loginForm.email, this.loginForm.password).subscribe((response: any) => {
      if (response && response.token) {
        localStorage.setItem('token', response.token);

        this.router.navigate(['/']);
      }
    });
  }
}

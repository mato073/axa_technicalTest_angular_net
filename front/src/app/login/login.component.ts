import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuhtService } from '../services/auht-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], // Fixed styleUrls
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  errorMessage = ''; // To store feedback messages

  constructor(
    private authService: AuhtService,
    private router: Router
  ) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }
    console.log("googd")

    this.authService.login(form.value).subscribe(
      (res) => {
        this.authService.storeToken(res.token);
        this.router.navigate(['/home']);
      },
      (err) => {
        // Handle server-side errors
        this.errorMessage = err.error?.message || 'Invalide email or password';
      }
    );
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}

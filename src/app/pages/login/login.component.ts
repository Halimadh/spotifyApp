import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router)
  private location = inject(Location)
  loading = false
  login() {
    this.authService.login();
    setTimeout(() => {
      if (this.authService.isAuthenticated()) {
        this.router.navigate(["/home"])
      }
    }, 1000
    )
  }
}

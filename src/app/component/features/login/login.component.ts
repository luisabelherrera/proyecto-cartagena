import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  imgSrc: string = 'assets/images/escudo-cartagena.png';

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin(): void {
    this.errorMessage = '';
    this.authService.login(this.email, this.password).subscribe((user: User | null) => {
      if (user) {
        if (user.role === 'Admin') {
          this.router.navigate(['/admin']);
        } else if (user.role === 'Ente Regulador') {
          this.router.navigate(['/ente-regulador']);
        }
      } else {
        this.errorMessage = 'Invalid email or password';
      }
    });
  }

  goBack() {
    this.router.navigate(['/']); // Or use history.back()
  }
}
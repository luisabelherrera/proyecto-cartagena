import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './component/shared/header/header.component';
import { SidebarComponent } from './component/shared/sidebar/sidebar.component';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  isAuthRoute(): boolean {
    const currentRoute = this.router.url
    return currentRoute.includes("/login") || currentRoute.includes("/register")
  }

  logout() {
    this.authService.logout()
    this.router.navigate(["/login"])
  }
}
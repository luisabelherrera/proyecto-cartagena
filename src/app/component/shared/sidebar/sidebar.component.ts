import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  private roleSubject = new BehaviorSubject<string | null>(null);
  role: string | null = null;
  isRoleLoaded = false;
  private roleSubscription: Subscription | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.roleSubscription = this.authService.getRoleObservable().subscribe(role => {
      this.role = role;
      this.isRoleLoaded = true; 
    });
  }

  ngOnDestroy(): void {
    if (this.roleSubscription) {
      this.roleSubscription.unsubscribe();
    }
  }
  getRoleObservable(): Observable<string | null> {
    return this.roleSubject.asObservable();
  }
  
  setRole(role: string): void {
    this.roleSubject.next(role);
  }
  
  getRole(): string | null {
    return this.roleSubject.value;
  }
  isAdmin(): boolean {
    return this.role === 'Admin';
  }

  isEnteRegulador(): boolean {
    return this.role === 'Ente Regulador';
  }

  logout(): void {
    this.authService.logout();
  }
}
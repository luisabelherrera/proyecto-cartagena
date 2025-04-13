import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [
    { id: 1, email: 'admin@corralito.com', password: 'admin123', role: 'Admin' },
    { id: 2, email: 'ente@corralito.com', password: 'ente123', role: 'Ente Regulador' },
  ];

  private currentUser: User | null = null;
  private roleSubject = new BehaviorSubject<string | null>(this.getRole()); 

  constructor(private router: Router) {
    this.roleSubject.next(this.getRole());
  }

  getRoleObservable(): Observable<string | null> {
    return this.roleSubject.asObservable();
  }

  login(email: string, password: string): Observable<User | null> {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUser = user;
      localStorage.setItem('auth_user', JSON.stringify(user));
      this.roleSubject.next(user.role);
      return of(user);
    }
    return of(null);
  }

  register(email: string, password: string, role: string): Observable<boolean> {
    if (!['Admin', 'Ente Regulador'].includes(role)) {
      return of(false);
    }
    const userExists = this.users.find(u => u.email === email);
    if (userExists) {
      return of(false);
    }
    const newUser: User = {
      id: this.users.length + 1,
      email,
      password,
      role
    };
    this.users.push(newUser);
    return of(true);
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('auth_user');
    this.roleSubject.next(null); 
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.getUserFromStorage();
  }

  getRole(): string | null {
    const user = this.getUserFromStorage();
    return user ? user.role : null;
  }

  getCurrentUser(): User | null {
    return this.getUserFromStorage();
  }

  private getUserFromStorage(): User | null {
    const userJson = localStorage.getItem('auth_user');
    return userJson ? JSON.parse(userJson) : null;
  }
}
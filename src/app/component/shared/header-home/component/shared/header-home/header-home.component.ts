import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-home',
  imports: [],
  templateUrl: './header-home.component.html',
  styleUrl: './header-home.component.css'
})
export class HeaderHomeComponent {
  isMenuOpen = false;
  imgSrc: string = 'assets/images/escudo-cartagena.png';


  constructor(private router: Router) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  goBack() {
    console.log('Navigating to /login'); // Debugging
    this.router.navigate(['/login']).then(success => {
      if (!success) {
        console.error('Navigation to /login failed');
      }
    });
  }
}
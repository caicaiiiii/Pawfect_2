import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { Header } from '../../shared/header/header'; // ✅ FIXED PATH
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf, Header, Footer], // ✅ include Header
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router) {}

  onLogin(): void {
    const users = this.getUsers();

    const matchedUser = users.find(
      (user: { email: string; password: string }) =>
        user.email === this.email && user.password === this.password
    );

    if (!matchedUser) {
      this.errorMessage = 'Invalid email or password.';
      return;
    }

    this.setCookie('pawfect_user', JSON.stringify(matchedUser), 1);
    this.errorMessage = '';
    this.router.navigate(['/']);
  }

  private getUsers(): Array<{ name: string; email: string; password: string }> {
    const users = localStorage.getItem('pawfect_users');
    return users ? JSON.parse(users) : [];
  }

  private setCookie(name: string, value: string, days: number): void {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/`;
  }
}

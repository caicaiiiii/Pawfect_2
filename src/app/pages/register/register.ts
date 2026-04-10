import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { Header } from '../../shared/header/header'; // ✅ FIXED PATH
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf, Header,Footer],
  templateUrl: './register.html',

  styleUrl: './register.css'
})
export class Register {
  name = '';
  email = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router) {}

  onRegister(): void {
    const users = this.getUsers();

    const userExists = users.some(
      (user: { email: string }) => user.email === this.email
    );

    if (userExists) {
      this.errorMessage = 'Email already registered.';
      return;
    }

    const newUser = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    users.push(newUser);
    localStorage.setItem('pawfect_users', JSON.stringify(users));

    // auto login after register
    this.setCookie('pawfect_user', JSON.stringify(newUser), 1);

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

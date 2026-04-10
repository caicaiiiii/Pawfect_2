import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { NgIf } from '@angular/common';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit, OnDestroy {
  menuOpen = false;
  isLoggedIn = false;

  private routerSub?: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkLoginStatus();

    this.routerSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.closeMenu();
        this.checkLoginStatus();
      });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
    document.body.classList.remove('lock');
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    this.updateBodyLock();
  }

  closeMenu(): void {
    this.menuOpen = false;
    this.updateBodyLock();
  }

  goToLogin(): void {
    this.closeMenu();
    this.router.navigate(['/login']);
  }


  signOut(): void {
    this.deleteCookie('pawfect_user');
    this.isLoggedIn = false;
    this.closeMenu();
    this.router.navigate(['/login']);
  }

  private checkLoginStatus(): void {
    this.isLoggedIn = this.hasCookie('pawfect_user');
  }

  private updateBodyLock(): void {
    if (this.menuOpen) {
      document.body.classList.add('lock');
    } else {
      document.body.classList.remove('lock');
    }
  }

  private hasCookie(name: string): boolean {
    const cookieName = `${name}=`;
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(cookieName)) {
        return true;
      }
    }

    return false;
  }

  private deleteCookie(name: string): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}

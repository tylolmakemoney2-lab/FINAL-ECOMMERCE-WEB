import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CartService } from './services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
  <div class="container">
    <!-- Logo -->
    <a class="navbar-brand fw-bold text-dark" routerLink="/">MiniShop</a>

    <!-- Hamburger toggler (for small screens) -->
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu"
      aria-controls="navMenu" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Collapsible Menu -->
    <div class="collapse navbar-collapse" id="navMenu">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item"><a class="nav-link" routerLink="/">Home</a></li>
        <li class="nav-item">
          <a class="nav-link position-relative" routerLink="/cart">
            Cart
            <span *ngIf="cart.count > 0"
                  class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {{cart.count}}
            </span>
          </a>
        </li>
        <li class="nav-item"><a class="nav-link" routerLink="/checkout">Checkout</a></li>
      </ul>
    </div>
  </div>
</nav>


    <main class="container py-4">
      <router-outlet></router-outlet>
    </main>

    <footer class="text-center text-muted small py-4">© {{year}} MiniShop</footer>
  `
})
export class AppComponent {
  year = new Date().getFullYear();
  constructor(public cart: CartService) {}
}

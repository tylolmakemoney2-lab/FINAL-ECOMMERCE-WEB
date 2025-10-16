import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

declare const Swal: any;

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  name = '';
  email = '';
  address = '';

  constructor(public cart: CartService, private router: Router) {}

  submit() {
    if (!this.name || !this.email || !this.address) {
      Swal.fire({ icon: 'warning', title: 'Missing info', text: 'Please fill in all fields.' });
      return;
    }
    const invoice = {
      customer: { name: this.name, email: this.email, address: this.address },
      items: this.cart.items.map(i => ({ title: i.product.title, qty: i.qty, price: i.product.price, subtotal: i.qty * i.product.price })),
      total: this.cart.total
    };

    const html = `
      <div style="text-align:left">
        <h3>Invoice</h3>
        <p><strong>Name:</strong> ${invoice.customer.name}<br>
           <strong>Email:</strong> ${invoice.customer.email}<br>
           <strong>Address:</strong> ${invoice.customer.address}</p>
        <hr>
        ${invoice.items.map(i => `<div style='display:flex;justify-content:space-between'><span>${i.title} × ${i.qty}</span><span>$${i.subtotal.toFixed(2)}</span></div>`).join('')}
        <hr>
        <div style='display:flex;justify-content:space-between;font-weight:700'><span>Total</span><span>$${invoice.total.toFixed(2)}</span></div>
      </div>`;

    Swal.fire({
    title: 'Order Confirmed',
    html,
    width: 600,
    confirmButtonText: 'OK'
  }).then(() => {
    this.cart.clear();
    this.router.navigate(['/']);  // 👈 redirect to Home
  });
  }
}

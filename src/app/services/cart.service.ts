import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import type { Product } from './product.service';

export interface CartItem {
  product: Product;
  qty: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private itemsSubject = new BehaviorSubject<CartItem[]>([]);
  items$ = this.itemsSubject.asObservable();

  get items(): CartItem[] { return this.itemsSubject.value; }

  add(product: Product, qty = 1) {
    const items = [...this.items];
    const idx = items.findIndex(i => i.product.id === product.id);
    if (idx > -1) {
      items[idx] = { ...items[idx], qty: items[idx].qty + qty };
    } else {
      items.push({ product, qty });
    }
    this.itemsSubject.next(items);
  }

  remove(productId: number) {
    const items = this.items.filter(i => i.product.id !== productId);
    this.itemsSubject.next(items);
  }

  increase(productId: number) {
    const items = this.items.map(i => i.product.id === productId ? { ...i, qty: i.qty + 1 } : i);
    this.itemsSubject.next(items);
  }

  decrease(productId: number) {
    let items = this.items.map(i => i.product.id === productId ? { ...i, qty: Math.max(1, i.qty - 1) } : i);
    this.itemsSubject.next(items);
  }

  clear() { this.itemsSubject.next([]); }

  get total(): number {
    return this.items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  }

  get count(): number {
    return this.items.reduce((sum, i) => sum + i.qty, 0);
  }
}

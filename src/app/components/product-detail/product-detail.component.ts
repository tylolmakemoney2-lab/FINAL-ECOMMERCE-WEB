import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

// SweetAlert2 global (from CDN in index.html)
declare const Swal: any;

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  loading = true;
  error: string | null = null;

  mainImage: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cart: CartService
  ) {}

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    try {
      this.product = await this.productService.getProduct(id);
      this.mainImage = this.product.images[0];
    } catch (e) {
      this.error = 'Failed to load product';
    } finally {
      this.loading = false;
    }
  }

  setMainImage(img: string) {
    this.mainImage = img;
  }

  addToCart(p: Product) {
    this.cart.add(p, 1);
    Swal.fire({
      icon: 'success',
      title: 'Added to cart',
      text: p.title,
      timer: 1200,
      showConfirmButton: false
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  error: string | null = null;

  constructor(private productService: ProductService) {}

  async ngOnInit() {
    try {
      this.products = await this.productService.getProducts(24, 0);
    } catch (e: any) {
      this.error = 'Failed to load products';
      console.error(e);
    } finally {
      this.loading = false;
    }
  }
}

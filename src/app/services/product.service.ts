import { Injectable } from '@angular/core';
import axios from 'axios';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: string;   // DummyJSON returns string category
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = 'https://dummyjson.com/products';

  async getProducts(limit = 24, skip = 0): Promise<Product[]> {
    const res = await axios.get(`${this.baseUrl}?limit=${limit}&skip=${skip}`);
    return res.data.products; // DummyJSON wraps in "products"
  }

  async getProduct(id: number): Promise<Product> {
    const res = await axios.get(`${this.baseUrl}/${id}`);
    return res.data;
  }
}

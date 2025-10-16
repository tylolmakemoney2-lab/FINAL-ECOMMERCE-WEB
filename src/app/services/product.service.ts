import { Injectable } from '@angular/core';
import axios from 'axios';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: { id: number; name: string };
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = 'https://api.escuelajs.co/api/v1/products';

  async getProducts(limit = 24, offset = 0): Promise<Product[]> {
    const res = await axios.get(`${this.baseUrl}?offset=${offset}&limit=${limit}`);
    return res.data;
  }

  async getProduct(id: number): Promise<Product> {
    const res = await axios.get(`${this.baseUrl}/${id}`);
    return res.data;
  }
}

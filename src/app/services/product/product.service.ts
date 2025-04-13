import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    { id: '785786', name: 'Arroz de coco', minPrice: 5000, maxPrice: 6000, zone: 'Comida' },
    { id: '887886', name: 'Camaron 60g', minPrice: 6000, maxPrice: 6000, zone: 'Comida' },
    { id: '887888', name: 'Pescado Frito', minPrice: 4000, maxPrice: 10000, zone: 'Comida' },
    { id: '9989759', name: 'Cocacola 800 ml', minPrice: 10000, maxPrice: 10000, zone: 'Comida' },
    { id: '8568785', name: 'Empanada de Carne', minPrice: 0, maxPrice: 0, zone: 'Comida' },
    { id: '9800879', name: 'Masajes de Pies', minPrice: 6000, maxPrice: 6000, zone: 'Servicios' },
    { id: '0786079', name: 'Arepa con Queso', minPrice: 0, maxPrice: 0, zone: 'Comida' },
    { id: '0986075', name: 'Sancocho', minPrice: 6000, maxPrice: 6000, zone: 'Comida' },
    { id: '8768759', name: 'Jugo de Naranja', minPrice: 0, maxPrice: 0, zone: 'Comida' },
    { id: '60879897', name: 'Postre 800ml', minPrice: 6000, maxPrice: 6000, zone: 'Comida' },
  ];

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(id: string): Observable<Product | undefined> {
    const product = this.products.find(p => p.id === id);
    return of(product);
  }

  addProduct(product: Product): Observable<Product> {
    this.products.push(product);
    return of(product);
  }

  updateProduct(id: string, updatedProduct: Product): Observable<Product | undefined> {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products[index] = { ...updatedProduct, id };
      return of(this.products[index]);
    }
    return of(undefined);
  }

  deleteProduct(id: string): Observable<boolean> {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { environment } from '../../../../environments/environment';
import { ProductResponse } from './product-response.type';
import { Product } from './product.type';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsResourceService {
  http = inject(HttpClient);

  getProducts() {
    return rxResource({
      loader: () => this.http.get<ProductResponse>(`${environment.api}products`)
    })
  };

  getCurrentProduct(id: Signal<number | null>) {
    return rxResource({
      request: () => {
        const productId = id();
        return productId !== null ? { id: productId } : null;
      },
      loader: ({ request }) =>
        request ? this.http.get<Product>(`${environment.api}products/${request.id}`) : of(null)
    });
  }

  updateProduct(product: Product) {
    return this.http.put<Product>(`${environment.api}products/${product.id}`, product);
  }

  saveProduct(product: Product) {
    return this.http.post<Product>(`${environment.api}products`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${environment.api}products/${id}`);
  }
}  

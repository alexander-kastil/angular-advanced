import { Component, inject, signal } from '@angular/core';
import { MarkdownRendererComponent } from '../../../shared/markdown-renderer/markdown-renderer.component';
import { HttpClient } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductResponse } from '../product/product-response.type';
import { environment } from '../../../../environments/environment';
import { ProductsResourceService } from '../product/products-resource.service';
import { ColumnDirective } from '../../../shared/formatting/formatting-directives';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-async-requests',
  imports: [
    MatButton,
    MarkdownRendererComponent,
    ColumnDirective
  ],
  templateUrl: './async-requests.component.html',
  styleUrl: './async-requests.component.scss'
})
export class AsyncRequestsComponent {
  resource = inject(ProductsResourceService);
  products = this.resource.getProducts();
  selectedProductId = signal<number | null>(null);
  product = this.resource.getCurrentProduct(this.selectedProductId);


  selectProduct(id: number) {
    this.selectedProductId.set(id);
  }

  updateProductMemory() {
    this.product.value.update(p => {
      if (p) {
        return { ...p, name: p.name + ' updated' };
      }
      return undefined;
    });
  }

  updateProduct() {
    const product = this.product.value();
    if (product) {
      product.name += ' updated in DB';
      this.resource.updateProduct(product).subscribe(p => {
        console.log('Product updated', p);
        this.product.set(p)
      });
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { environment } from '../../../../environments/environment';
import { BoxedDirective, ClickableDirective, ColumnDirective } from '../../../shared/formatting/formatting-directives';
import { MarkdownRendererComponent } from '../../../shared/markdown-renderer/markdown-renderer.component';
import { Product } from '../product/product.type';

@Component({
  selector: 'app-linked-signal',
  imports: [
    MarkdownRendererComponent,
    BoxedDirective,
    ClickableDirective,
    ColumnDirective
  ],
  templateUrl: './linked-signal.component.html',
  styleUrl: './linked-signal.component.scss'
})
export class LinkedSignalComponent {
  http = inject(HttpClient);
  products = linkedSignal(toSignal(this.http.get<Product[]>(`${environment.api}products`)));
  selectedProduct = signal<Product | null>(null);
  price = computed(() => this.selectedProduct()?.price ?? 0);

  quantity = linkedSignal({
    source: this.selectedProduct,
    computation: () => 1
  });

  total = computed(() => this.quantity() * this.price());

  onQuantityChanged(qty: number) {
    this.quantity.set(qty);
  }

  setSelected(p: Product) {
    this.selectedProduct.set(p);
  }

  updateQuantity(qty: number) {
    this.quantity.update(curr => curr + qty);
  }
}

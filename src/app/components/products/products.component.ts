import { Component, OnInit } from '@angular/core';
import { Product } from './../../model/product.model';
import { ProductsService } from './../../services/product.service';
import { ValueService } from './../../services/value.service';

@Component({
  selector: 'test-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  limit = 10;
  offset = 0;
  rta = '';
  status: 'loading' | 'success' | 'error' | 'init' = 'init';
  constructor(private readonly productsService: ProductsService,
              private readonly valueService: ValueService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.status = 'loading';
    this.productsService.getAll(this.limit, this.offset).subscribe( {
      next: (respuesta) => {
        this.products = [...this.products, ...respuesta];
        this.offset += this.limit;
        this.status = 'success';
      },
      error: err => {
        setTimeout(() => {
          this.products = [];
          this.status = 'error';
        }, 3000);
      }
    });
  }

  async callPromise() {
    const rta = await this.valueService.getPromiseValue();
    this.rta = rta;
  }
}

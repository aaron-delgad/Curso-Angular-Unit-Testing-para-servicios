import { Component, OnInit } from '@angular/core';
import { Product } from './../../model/product.model';
import { ProductsService } from './../../services/product.service';

@Component({
  selector: 'test-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  constructor(private readonly productsService: ProductsService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productsService.getAllSimple().subscribe(respuesta => {
      this.products = respuesta;
    })
  }
}

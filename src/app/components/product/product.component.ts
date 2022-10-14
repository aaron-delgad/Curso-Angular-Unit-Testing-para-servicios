import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../model/product.model";

@Component({
  selector: 'test-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product!: Product;
  constructor() { }

  ngOnInit(): void {
  }

}

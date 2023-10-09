import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  handleProductDetails() {
    const id: number = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProduct(id).subscribe(
      data => {
        this.product = data;
      }
    )
  }

  addToCart() {
    let theCartItem = new CartItem(this.product.id, this.product.name, this.product.imageUrl, this.product.unitPrice);
    
    this.cartService.addToCart(theCartItem);
  }
}

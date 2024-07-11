import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './products.component.html',
  styleUrl: '../../../styles.css'
})
export class ProductsComponent implements OnInit {

  productsArray: any[] = []
  categories: any[] = []
  selectedCategory: number = 0
  constructor(private productSrv: ProductService) {

  }
  ngOnInit(): void {
    this.loadProducts()
    this.loadCategory()
    // this.getAllProductByCategory(1)
  }

  loadProducts() {
    this.productSrv.getAllProducts().subscribe((res: any) => {
      this.productsArray = res.data
    })
  }
  getAllProductByCategory(categoryId: number) {
    this.selectedCategory = categoryId
    this.productSrv.getAllProductsByCategory(categoryId).subscribe((res: any) => {
      this.productsArray = res.data

    })
  }
  loadCategory() {
    this.productSrv.getAllCategory().subscribe((res: any) => {
      this.categories = res.data.slice(0, 7)



    })
  }

}

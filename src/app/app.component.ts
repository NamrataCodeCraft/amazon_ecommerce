import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'amazon_ecommerce';
  registerObj: any = {
    "CustId": 0,
    "Name": "",
    "MobileNo": "",
    "Password": ""
  }
  loginObj: any = {
    "UserName": "",
    "UserPassword": ""
  }
  loggedObj: any = {}
  cartItems: any[] = []
  productsArray: any[] = []
  categories: any[] = []
  selectedCategory: number = 0

  total: number = 0
  constructor(private productSrv: ProductService) {
    const localData = localStorage.getItem("amazon_user")
    if (localData != null) {
      const parseObj = JSON.parse(localData)
      this.loggedObj = parseObj
      this.getCartData(this.loggedObj.custId)
    }
    this.productSrv.cartUpdated.subscribe((res: Boolean) => {
      if (res) {
        this.getCartData(this.loggedObj.custId)
      }
    })
  }
  ngOnInit(): void {
    this.loadCategory()
  }
  getCartData(id: number) {
    this.productSrv.getAddtoCartDataByCust(id).subscribe((res: any) => {
      this.cartItems = res.data
      this.total = this.cartItems.reduce((acc, item) => acc + item.productPrice, 0);
    })
  }
  getAllProductByCategory(categoryId: number) {
    this.selectedCategory = categoryId
    this.productSrv.getAllProductsByCategory(categoryId).subscribe((res: any) => {
      this.productsArray = res.data

    })
  }
  onRegister() {
    this.productSrv.register(this.registerObj).subscribe((res: any) => {
      if (res.result) {
        this.loggedObj = res.data
        alert("User Creation Done")
      } else {
        alert(res.message)
      }
    })

  }
  onLogin() {
    this.productSrv.login(this.loginObj).subscribe((res: any) => {
      if (res.result) {
        alert("User Login Success")
        this.loggedObj = res.data
        localStorage.setItem('amazon_user', JSON.stringify(res.data))
        this.getCartData(this.loggedObj.custId)
      } else {
        alert(res.message)
      }
    })
  }

  removeItem(cartId: number) {
    this.productSrv.removeProductFromCart(cartId).subscribe((res: any) => {
      if (res.result) {
        alert('Item Removed')
        this.getCartData(this.loggedObj.custId)
      } else {
        alert(res.message)
      }
    })
  }
  loadCategory() {
    this.productSrv.getAllCategory().subscribe((res: any) => {
      this.categories = res.data.slice(0, 30)
    })
  }
}

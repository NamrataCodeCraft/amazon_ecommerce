import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  loggedObj: any = {}
  cartItems: any[] = []
  checkoutObj: any = {
    "SaleId": 0,
    "CustId": 0,
    "SaleDate": new Date(),
    "TotalInvoiceAmount": 0,
    "Discount": 0,
    "PaymentNaration": "",
    "DeliveryAddress1": "",
    "DeliveryAddress2": "",
    "DeliveryCity": "",
    "DeliveryPinCode": "",
    "DeliveryLandMark": ""
  }
  total: number = 0
  constructor(private productSrv: ProductService) {
    const localData = localStorage.getItem("amazon_user")
    if (localData != null) {
      const parseObj = JSON.parse(localData)
      this.loggedObj = parseObj
      this.getCartData(this.loggedObj.custId)
    }

  }
  ngOnInit(): void {
    this.calculateSum();

  }

  getCartData(id: number) {
    this.productSrv.getAddtoCartDataByCust(id).subscribe((res: any) => {
      this.cartItems = res.data
      this.total = this.cartItems.reduce((acc, item) => acc + item.productPrice, 0);
    })
  }
  calculateSum(): void {
    this.total = this.cartItems.reduce((acc, value) => acc + value, 0);
  }
  placeOrder() {
    this.checkoutObj.CustId = this.loggedObj.custId
    this.productSrv.PlaceOrder(this.checkoutObj).subscribe((res: any) => {
      if (res.result) {
        this.productSrv.cartUpdated.next(true)
        alert("Order has been successfully placed")
      } else {
        alert(res.message)
      }
    })
  }
}

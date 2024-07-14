import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from './constant/constant';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartUpdated: Subject<Boolean> = new Subject<Boolean>()
  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get(Constant.API_END_POINT + Constant.METHODS.GET_ALL_PRODUCT)
  }
  getAllProductsByCategory(id: number) {
    return this.http.get(Constant.API_END_POINT + Constant.METHODS.GET_ALL_PRODUCT_BY_CATEGORY + id)
  }
  getAllCategory() {
    return this.http.get(Constant.API_END_POINT + Constant.METHODS.GET_ALL_CATEGORY)
  }
  register(obj: any) {
    return this.http.post(Constant.API_END_POINT + Constant.METHODS.REGISTER, obj)
  }
  login(obj: any) {
    return this.http.post(Constant.API_END_POINT + Constant.METHODS.LOGIN, obj)
  }
  addtocart(obj: any) {
    return this.http.post(Constant.API_END_POINT + Constant.METHODS.ADD_TO_CART, obj)
  }
  getAddtoCartDataByCust(id: number) {
    return this.http.get(Constant.API_END_POINT + Constant.METHODS.GetCartProductsByCustomerId + id)
  }
  removeProductFromCart(cartId: number) {
    return this.http.get(Constant.API_END_POINT + Constant.METHODS.DeleteProductFromCartById + cartId)
  }
  PlaceOrder(obj: any) {
    return this.http.post(Constant.API_END_POINT + Constant.METHODS.PlaceOrder, obj)
  }
  getProductDetail(id: number) {
    return this.http.get(Constant.API_END_POINT + Constant.METHODS.GetProductById + id)
  }
}

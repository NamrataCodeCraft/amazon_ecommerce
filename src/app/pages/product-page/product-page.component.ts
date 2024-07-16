import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';



@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [RouterLink,],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit {
  loggedObj: any = {}
  productObj: any = {}
  id: string = ""
  constructor(private productSrv: ProductService, private route: ActivatedRoute , private router: Router) {

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.getProductDetail(Number(this.id));
  }
  getProductDetail(id: number) {
    this.productSrv.getProductDetail(id).subscribe((res: any) => {
      this.productObj = res.data
    })
  }
  addtocart(productId: number) {
    const obj: any = {
      "CartId": 0,
      "CustId": this.loggedObj.custId,
      "ProductId": productId,
      "Quantity": 0,
      "AddedDate": new Date()
    }
    this.productSrv.addtocart(obj).subscribe((res: any) => {
      if (res.result) {
        alert('Product Added to Cart')
        this.productSrv.cartUpdated.next(true)
        this.router.navigate(['/checkout']);
      } else {
        alert(res.message)
      }
    })
  }

}

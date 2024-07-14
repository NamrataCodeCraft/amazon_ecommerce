import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';



@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [RouterLink, ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit {
  loggedObj: any = {}
  productObj: any = {}
  id: string = ""
  // constructor(private route: ActivatedRoute) { }
  constructor(private productSrv: ProductService, private route: ActivatedRoute) {


  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    console.log(this.id,'---------------------');
    
    this.getProductDetail(Number(this.id));
  }
    getProductDetail(id: number) {
      this.productSrv.getProductDetail(id).subscribe((res: any) => {

        this.productObj = res.data
        console.log('shshsh', this.productObj)
      })
    }
  }

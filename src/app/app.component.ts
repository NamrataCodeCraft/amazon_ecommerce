import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductService } from './services/product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'amazon_ecommerce';
  registerObj: any = {
    "CustId": 0,
    "Name": "",
    "MobileNo": "",
    "Password": ""
  }
  loginObj: any = {
    "UserName": "string",
    "UserPassword": "string"
  }
  constructor(private productSrv: ProductService) {

  }
  onRegister() {
    this.productSrv.register(this.registerObj).subscribe((res: any) => {
      if (res.result) {
        alert("User Creation Done")
      } else {
        alert(res.message)
      }
    })

  }
}

import { Component, OnInit } from "@angular/core";
import { HttpClient  } from '@angular/common/http';
import {ShoppingMall} from '../../models/shoppingMall';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListShop implements OnInit {
  public shopList:ShoppingMall[];
  public item:string="";
  constructor(public http: HttpClient){

    }

  ngOnInit() {
    
      this.http.get<ShoppingMall[]>('http://localhost:8080/list/shops').subscribe(data => {
          this.shopList = data;
          console.log(this.shopList);
      });
    
   }

}

import { Component, OnInit } from "@angular/core";
import { HttpClient  } from '@angular/common/http';
import {ShoppingMall} from './models/shoppingMall';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'shopping-mall';

 
  constructor(public http: HttpClient){

    }

  ngOnInit() {
    
     
    
   }

}

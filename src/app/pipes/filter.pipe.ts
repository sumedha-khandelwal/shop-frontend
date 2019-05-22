import { Pipe, PipeTransform } from '@angular/core';
import {ShoppingMall} from '../models/shoppingMall';
@Pipe({
  name: 'search'
})
export class FilterPipe implements PipeTransform {

    transform(shops: ShoppingMall[], args: any): any {
        if(!shops)return null;
         if(!args)return shops;
       
         if(args == null) return shops;
    
        return shops.filter(function(item){
          return item.name.toLowerCase().indexOf(args.toLowerCase()) > -1 ;
        })
      }
}
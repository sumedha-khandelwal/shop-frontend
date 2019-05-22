import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommonModule} from '@angular/common';
import { BrowserModule } from "@angular/platform-browser";
import {ListShop} from '../app/components/list2/list.component';
import {AddShop} from '../app/components/addShop/addShop.component';


const routes: Routes = [
{ path: "list", component: ListShop},
{ path: "add", component: AddShop}
];

@NgModule({
  declarations:[],
  imports: [RouterModule.forRoot(routes),BrowserModule,CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routedComponents = [ListShop,AddShop];

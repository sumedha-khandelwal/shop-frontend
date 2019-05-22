import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import {HttpClientModule} from "@angular/common/http"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ListShop} from '../app/components/list2/list.component'
import {AddShop} from '../app/components/addShop/addShop.component'
import {FilterPipe} from '../app/pipes/filter.pipe'


@NgModule({
  declarations: [
    AppComponent,
    ListShop,
    AddShop,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCxtqQQDrDI0IG-oS--LeqmSirJ-8tXfCY',
      libraries: ['places']
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

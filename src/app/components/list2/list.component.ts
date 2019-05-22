import { Component, OnInit ,ViewChild, ElementRef, NgZone } from "@angular/core";
import { HttpClient ,HttpParams } from '@angular/common/http';
import {ShoppingMall} from '../../models/shoppingMall';
import {MapsService} from '../../maps.service'
import { MapsAPILoader, MouseEvent } from '@agm/core';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListShop implements OnInit {
  public shopList:ShoppingMall[];
  public item:string="";
  private geoCoder:any;
  lat: number;
  lng: number;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(public http: HttpClient ,map:MapsService,private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone){

    }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
      this.setCurrentLocation();

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          console.log("here");
          this.searchLoaction(this.lat,this.lng);
        });
      });
    });

      this.http.get<ShoppingMall[]>('http://localhost:8080/list/shops').subscribe(data => {
          this.shopList = data;
          console.log(this.shopList);
      });
    
   }

   private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((resp) => {
        this.lat= resp.coords.latitude;
        this.lng = resp.coords.longitude;
      });
    }
  }

  private searchLoaction(latArg,longArg){
    let params = new HttpParams();
    params = params.append('lat', latArg);
    params = params.append('lng', longArg);
    this.http.get<ShoppingMall[]>('http://localhost:8080/shop/search',{params: params}).subscribe(data => {
      this.shopList = data;
      console.log(this.shopList);
  });
  }


}

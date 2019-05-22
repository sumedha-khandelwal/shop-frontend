import { Component, OnInit ,ViewChild, ElementRef, NgZone } from "@angular/core";
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule} from "@angular/forms";
import {MapsService} from '../../maps.service'
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { HttpClient  } from '@angular/common/http';



@Component({
  selector: 'app-shop',
  templateUrl: './addShop.component.html',
  styleUrls: ['./addShop.component.scss']
})
export class AddShop implements OnInit {
  lat: number;
  lng: number;
  zoom:number;
  location:Object;
  address: string;
  private geoCoder:any;
  submitAttempt: Boolean = false;
  processing:Boolean=false;
 
  @ViewChild('search')
  public searchElementRef: ElementRef;

  public shopForm: FormGroup;
    optionsSelect: Array<any>;
 
  constructor(private fb: FormBuilder,private map:MapsService,private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,public http: HttpClient){
      this.shopForm = this.fb.group({
        name: ['', Validators.compose([Validators.required, Validators.maxLength(23), Validators.minLength(2), Validators.pattern('^[a-zA-Z ]+$')])],
        ownerName: ['', Validators.compose([Validators.required, Validators.maxLength(23), Validators.minLength(2), Validators.pattern('^[a-zA-Z ]+$')])],
        address: ['', Validators.compose([Validators.required])],        
        shopType: ['', Validators.compose([Validators.required])],
        latitude:[Validators.compose([Validators.required])],
        longitude:[Validators.compose([Validators.required])]
      });

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
          this.zoom = 12;
        });
      });
    });


  this.optionsSelect = [
    { value: 'GENERAL_STORE', label: 'GENERAL STORE' },
    { value: 'SUPERMARKET', label: 'SUPERMARKET' },
    { value: 'MALL', label: 'MALL' },
    { value: 'MEDICAL_STORE', label: 'MEDICAL STORE' },
  ];

  }

    // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((resp) => {
        this.lat= resp.coords.latitude;
        this.lng = resp.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.lat, this.lng);
      });
    }
  }
  submit(event, item) {
  this.submitAttempt = true;
  if (!this.shopForm.valid) {
    console.log("error!")
  }
  else{
    this.processing=true;
    this.submitForm();
  }
  
  }

  submitForm(){
   
    let shop = new FormData();
    shop.append("name", this.shopForm.controls.name.value);
    shop.append("ownerName", this.shopForm.controls.ownerName.value);
    shop.append("address", this.shopForm.controls.address.value);
    shop.append("shopType", this.shopForm.controls.shopType.value);
    shop.append("latitude", this.lat+"");
    shop.append("longitude", this.lng+"");
    console.log(shop);
    this.http.post('http://localhost:8080/saveShop', shop,{responseType: 'text'}).subscribe(data => {
      console.log("success" + data);
  });
 }



  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.lat= $event.coords.lat;
    this.lng = $event.coords.lng;
    this.getAddress(this.lat, this.lng);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

}

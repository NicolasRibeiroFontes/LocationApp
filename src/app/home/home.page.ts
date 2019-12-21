import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  geoCoder: any;
  erroGeoCoder: any;
  location: any;
  erroLocation: any;

  constructor(private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder, private alert: AlertController) { }


  getLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.location = resp;
      console.log('location'+ resp);
      // resp.coords.latitude
      // resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
       this.erroLocation = JSON.stringify(error);
     });
  }

  getGeoCoder() {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.reverseGeocode(this.location.coords.latitude, this.location.coords.longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        console.log(JSON.stringify(result[0]));
        this.geoCoder = result[0]; 
        console.log('geocoder'+ this.geoCoder);       
      })
      .catch((error: any) => {
        console.log(error);   
        this.erroGeoCoder = JSON.stringify(error);
      });
  }
}

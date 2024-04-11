import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/event.service'
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
// import { Table } from './tableofevents';
import { MatTabsModule } from '@angular/material/tabs';
import { EventCard } from 'src/app/eventCard';
// import { Spotify } from '../spotify';
// import { Venue } from '../venue';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { GoogleMapsModule } from '@angular/google-maps'
import { CarouselComponent } from 'src/app/carousel/carousel.component';
import { NgIf } from '@angular/common';

// interface FavoriteItem {
//   id: number;
//   date: string;
//   fav_name: string;
//   fav_venue: string;
//   fav_gen:string;
// }

@Component({
  // selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})



export class FavoritesComponent implements OnInit{

favitems:any[]=[];
constructor() { }

ngOnInit() {
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    if (key!==null){
    var itemJSON = localStorage.getItem(key);
    if (itemJSON !== null) {
      const item: any = JSON.parse(itemJSON);
      this.favitems.push(item);
      console.log("fav items")
      console.log(this.favitems)
    }
  }
}
}

deleteItem(event_id:string){

  localStorage.removeItem(event_id);
  
  alert("Removed from favorites!");
  // window.location.reload();
  

}

}

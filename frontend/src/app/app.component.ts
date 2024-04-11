import { Component } from '@angular/core';
import { SearchComponent } from './components/search/search.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { AppRoutingModule } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:string = 'my-dream-app';
  activeTab!:string;
  
}


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent} from 'src/app/components/nav-bar/nav-bar.component'
import { SearchComponent} from 'src/app/components/search/search.component'
import { RouterModule, Routes } from '@angular/router'
import { FavoritesComponent } from './favorites/favorites.component';


const routes: Routes=[
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: 'search', component:SearchComponent},
  {path: 'favorites', component:FavoritesComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContentComponent } from './pages/content/content.component';

import { ProductionComponent } from './pages/production/production.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FavoriteListComponent } from './pages/favorite-list/favorite-list.component';

const routes: Routes = [
	{
		path:'',
		component:HomeComponent
	},
	{
		path: 'content/:id',
		component: ContentComponent
	},

	{ 
		path: 'content/filmes/:id', 
		component: ContentComponent, 
		data: { type: 'filmes' } 
	}, 
	
	{ path: 'content/series/:id', 
	  component: ContentComponent, 
	  data: { type: 'series' } 
	},

	{
		path: 'filmes',
		component: ProductionComponent,
		data: { type: 'filmes'}
	},

	{
		path: 'series',
		component: ProductionComponent,
		data: { type: 'series'}
	},

	{
		path: 'search/:query',
		component: ProductionComponent,
		data: { type: 'search'}
	},

	{
		path: 'profile',
		component: ProfileComponent
	},

	{
		path: 'minha-lista',
		component: FavoriteListComponent
	},

	{
		path: '**',
		redirectTo: '',
		pathMatch: 'full'
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

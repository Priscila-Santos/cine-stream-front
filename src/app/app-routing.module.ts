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

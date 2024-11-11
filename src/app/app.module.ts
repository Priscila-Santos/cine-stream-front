import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { MenuTitleComponent } from './components/menu-title/menu-title.component';
import { BigCardComponent } from './components/big-card/big-card.component';
import { SmallCardComponent } from './components/small-card/small-card.component';
import { HomeComponent } from './pages/home/home.component';
import { ContentComponent } from './pages/content/content.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchDialogComponent } from './components/search-dialog/search-dialog.component';
import { MatDialogModule } from '@angular/material/dialog'; import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router';
import { ProductionComponent } from './pages/production/production.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FavoriteListComponent } from './pages/favorite-list/favorite-list.component';


const appRoutes = [

  { path: 'content/:id', component: ContentComponent },
  { path: 'productions/:genre', component: ProductionComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', component: HomeComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    MenuTitleComponent,
    BigCardComponent,
    SmallCardComponent,
    HomeComponent,
    ContentComponent,
    SearchDialogComponent,
    ProductionComponent,
    ProfileComponent,
    FavoriteListComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    RouterModule.forRoot(appRoutes) // configurar as rotas
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [SearchDialogComponent]
})
export class AppModule { }

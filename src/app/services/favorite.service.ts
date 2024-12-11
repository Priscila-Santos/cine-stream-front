import { Injectable } from '@angular/core';
import { Data } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favorites: Data[] = [];

  addFavorite(article: Data): void {
    if (!this.isFavorite(article)) {
      this.favorites.push(article);
    }
  }

  removeFavorite(article: Data): void {
    this.favorites = this.favorites.filter(fav => fav.id !== article.id);
  }

  getFavorites(): Data[] {
    return this.favorites;
  }

  isFavorite(article: Data): boolean {
    return this.favorites.some(fav => fav.id === article.id);
  }
}

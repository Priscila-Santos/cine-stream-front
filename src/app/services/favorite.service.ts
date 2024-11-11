import { Injectable } from '@angular/core';
import { Article } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favorites: Article[] = [];

  addFavorite(article: Article): void {
    if (!this.isFavorite(article)) {
      this.favorites.push(article);
    }
  }

  removeFavorite(article: Article): void {
    this.favorites = this.favorites.filter(fav => fav.id !== article.id);
  }

  getFavorites(): Article[] {
    return this.favorites;
  }

  isFavorite(article: Article): boolean {
    return this.favorites.some(fav => fav.id === article.id);
  }
}

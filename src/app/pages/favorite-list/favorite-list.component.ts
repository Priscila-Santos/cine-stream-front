import { Component, OnInit } from '@angular/core';
import { FavoriteService } from 'src/app/services/favorite.service';
import { Article } from 'src/app/services/data.service';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent implements OnInit {
  articles: Article[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 15;

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    this.articles = this.favoriteService.getFavorites();
  }

  get paginatedArticles(): Article[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.articles.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage(): void {
    if ((this.currentPage * this.itemsPerPage) < this.articles.length) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  toggleFavorite(article: Article): void {
    if (this.isFavorite(article)) {
      this.favoriteService.removeFavorite(article);
    } else {
      this.favoriteService.addFavorite(article);
    }
  }

  isFavorite(article: Article): boolean {
    return this.favoriteService.getFavorites().some(fav => fav.id === article.id);
  }
}

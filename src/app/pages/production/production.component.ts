import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService, Article } from 'src/app/services/data.service';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})
export class ProductionComponent implements OnInit {
  articles: Article[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 15;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    const type = this.route.snapshot.paramMap.get('type');
    if(type === 'movies') {
      this.articleService.getAllMovies().subscribe((articles: Article[]) => {
        this.articles = articles;
      });
    } else if (type === 'series') {
      this.articleService.getAllSeries().subscribe((articles: Article[]) => {
        this.articles = articles;
      });
    }

    const genre = this.route.snapshot.paramMap.get('genre');
    if (genre) {
      this.articleService.getArticlesByGenre(genre).subscribe((articles: Article[]) => {
        this.articles = articles;
      });
    } else {
      this.articleService.getArticles().subscribe((articles: Article[]) => {
        this.articles = articles;
      });
    }
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
    if (this.isFavorited(article)) {
      this.favoriteService.removeFavorite(article);
    } else {
      this.favoriteService.addFavorite(article);
    }
  }

  isFavorited(article: Article): boolean {
    return this.favoriteService.getFavorites().some(fav => fav.id === article.id);
  }
}

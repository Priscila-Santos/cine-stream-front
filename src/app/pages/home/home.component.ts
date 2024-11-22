import { Component, OnInit } from '@angular/core';
import { ArticleService, Article, Genre } from 'src/app/services/data.service';
@Component({ 
  selector: 'app-home', 
  templateUrl: './home.component.html', 
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  mainArticle: Article | undefined;
  genres: Genre[] = [];
  articlesByGenre: { [key: string]: Article[] } = {};

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
      this.articleService.getArticles().subscribe((articles: Article[]) => {
        if(articles.length > 0) {
          this.mainArticle = articles[0];
        }
      });

      this.articleService.getGenres().subscribe((genres: Genre[]) => {
        this.genres = genres;
        genres.forEach((genre: Genre) => {
          this.articleService.getArticlesByGenre(genre.name).subscribe((articles: Article[]) => {
            this.articlesByGenre[genre.name] = articles;
          });
        });
      });

  }
}
import { Component, OnInit } from '@angular/core';
import { ArticleService, Article } from 'src/app/services/article.service';
@Component({ 
  selector: 'app-home', 
  templateUrl: './home.component.html', 
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  mainArticle: Article | undefined;
  genres: string[] = ['Action', 'Comedy', 'Drama']; // Adicione os gêneros conforme necessário
  articlesByGenre: { [key: string]: Article[] } = {};

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
      this.articleService.getArticles().subscribe((articles: Article[]) => {
        if(articles.length > 0) {
          this.mainArticle = articles[0];
        }
      });

      this.genres.forEach(genre => {
        this.articleService.getArticlesByGenre(genre).subscribe((articles: Article[]) => {
          this.articlesByGenre[genre] = articles;
        });
      });
  }
}
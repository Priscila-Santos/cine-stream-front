import { Component, OnInit } from '@angular/core';
import { ArticleService, Article } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'cine-stream';
  mainArticle: Article | undefined; otherArticles: Article[] = [];
  genres: string[] = ['Action', 'Comedy', 'Drama']; articlesByGenre: { [key: string]: Article[] } = {};

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
      this.articleService.getArticles().subscribe((articles:Article[]) => {
        if(articles.length > 0) {
          this.mainArticle = articles[0];
          this.otherArticles = articles.slice(1);
        }
      });

      this.genres.forEach(genre => {
        this.articleService.getArticlesByGenre(genre).subscribe((articles: Article[]) => {
          this.articlesByGenre[genre] = articles;
        });
      });
  }

}

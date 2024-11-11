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
  // ['Mais Vistos', 'Melhores Avalidados','Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Thriller', 'Sci-Fi', 'Fantasy', 'Documentary', 'Animation']
   
  articlesByGenre: { [key: string]: Article[] } = {};

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
      this.articleService.getArticles().subscribe((articles: Article[]) => {
        if(articles.length > 0) {
          this.mainArticle = articles[0];
        }
      });

      this.articleService.getArticlesByGenre(this.genres[0]?.id).subscribe((articles: Article[]) => {
        if(articles.length > 0){
          this.mainArticle = articles[0];
        }
      })

      // this.genres.forEach(genre => {
      //   this.articleService.getArticlesByGenre(genre).subscribe((articles: Article[]) => {
      //     this.articlesByGenre[genre] = articles;
      //   });
      // });
  }
}
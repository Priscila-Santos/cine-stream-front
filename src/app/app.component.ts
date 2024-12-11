// import { Component, OnInit } from '@angular/core';
// import { DataService, Data, Genre } from './services/data.service';
// import { Observable, Observer } from 'rxjs';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit {
//   title = 'cine-stream';
//   mainArticle: Data | undefined; 
//   otherArticles: Data[] = [];
//   genres: Genre[] = []; 
//   articlesByGenre: { [key: string]: Data[] } = {};

//   constructor(private dataService: DataService) {}

//   ngOnInit(): void {
//       this.loadMainArticle();
//       this.loadGenres();
//   }

//   loadMainArticle(): void {
//     this.dataService.getAllMovies().subscribe((data: Data[]) => {
//       if (data && data.length > 0) {
//         this.mainArticle = data[0];
//         this.otherArticles = data.slice(1);
//       }
//     }, error => {
//       console.error('Erro ao buscar filmes:', error);
//     });
//   }

//   loadGenres(): void {
//     const genreObserver: Observer<Genre[]> = {
//       next: (genres) => {
//         if (genres && genres.length > 0) { // Verificação adicional
//           this.genres = genres;
//           this.genres.forEach((genre) => {
//             this.loadArticlesByGenre(genre.name);
//           });
//         } else {
//           console.error('Nenhum gênero encontrado');
//         }
//       },
//       error: (err) => console.error('Erro ao carregar os gêneros:', err),
//       complete: function (): void {
//         throw new Error('Function not implemented.');
//       }
//     };
//     this.dataService.getGenresForMovies().subscribe(genreObserver);
//   }
  

 

//   loadArticlesByGenre(genre: string): void {
//     this.dataService.getMoviesByGenre(genre).subscribe((articles: Data[]) => {
//       if (articles && Array.isArray(articles)) {
//         this.articlesByGenre[genre] = articles;
//       }
//     }, error => {
//       console.error(`Erro ao buscar artigos para o gênero ${genre}:`, error);
//     });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { DataService, Data, Genre } from './services/data.service';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cine-stream';
  mainArticle: Data | undefined; 
  otherArticles: Data[] = [];
  genres: Genre[] = []; 
  articlesByGenre: { [key: string]: Data[] } = {};

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadMainArticle();
    this.loadGenres();
  }

  loadMainArticle(): void {
    this.dataService.getAllMovies().subscribe((data: Data[]) => {
      if (data && data.length > 0) {
        this.mainArticle = data[0];
        this.otherArticles = data.slice(1);
      }
    }, error => {
      console.error('Erro ao buscar filmes:', error);
    });
  }

  loadGenres(): void {
    const genreObserver: Observer<{ genres: Genre[] }> = {
      next: (response) => {
        if (response.genres && Array.isArray(response.genres)) {
          console.log('Gêneros carregados:', response.genres);
          this.genres = response.genres;
          this.genres.forEach((genre) => {
            this.loadArticlesByGenre(genre.id);
          });
        } else {
          console.error('Nenhum gênero encontrado');
        }
      },
      error: (err) => console.error('Erro ao carregar os gêneros:', err),
      complete: () => console.log('Carregamento de gêneros completo')
    };
    this.dataService.getGenresForMovies().subscribe(genreObserver);
  }

  loadArticlesByGenre(genreId: number): void {
    this.dataService.getMoviesByGenre(genreId).subscribe((articles: Data[]) => {
      const genre = this.genres.find(g => g.id === genreId);
      if (articles && Array.isArray(articles) && genre) {
        this.articlesByGenre[genre.name] = articles;
      }
    }, error => {
      console.error(`Erro ao buscar artigos para o gênero ${genreId}:`, error);
    });
  }
}


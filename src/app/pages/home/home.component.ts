// import { Component, OnInit } from '@angular/core';
// import { DataService, Data, Genre } from 'src/app/services/data.service';
// import { Observable, Observer } from 'rxjs';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements OnInit {

//   mainData: Data[] = [];
//   genres: Genre[] = [];
//   dataByGenre: { [key: string]: Data[] } = {};

//   constructor(private dataService: DataService) { }

//   ngOnInit(): void {
//     this.loadMainArticles();
//     this.loadGenres();
//   }

//   // loadMainArticles(): void {
//   //   const allData: Data[] = [];
//   //   const movieObserver: Observer<Data[]> = {
//   //     next: (movies) => {
//   //       allData.push(...movies);
//   //       this.dataService.getAllSeries().subscribe({
//   //         next: (series) => {
//   //           allData.push(...series);
//   //           this.mainData = this.getRandomItems(allData, 6);
//   //         },
//   //         error: (err) => console.error('Erro ao carregar séries:', err),
//   //       });
//   //     },
//   //     error: (err) => console.error('Erro ao carregar filmes:', err),
//   //     complete: () => { }
//   //   };
//   //   this.dataService.getAllMovies().subscribe(movieObserver);
//   // }

//   loadMainArticles(): void {
//     const allData: Data[] = [];
//     const movieObserver: Observer<Data[]> = {
//       next: (movies) => {
//         if (Array.isArray(movies)) {
//           allData.push(...movies);
//           this.dataService.getAllSeries().subscribe({
//             next: (series) => {
//               if (Array.isArray(series)) {
//                 allData.push(...series);
//                 this.mainData = this.getRandomItems(allData, 6);
//               } else {
//                 console.error('Erro: Dados de séries não são um array');
//               }
//             },
//             error: (err) => console.error('Erro ao carregar séries:', err),
//           });
//         } else {
//           console.error('Erro: Dados de filmes não são um array');
//         }
//       },
//       error: (err) => console.error('Erro ao carregar filmes:', err),
//       complete: () => { }
//     };
//     this.dataService.getAllMovies().subscribe(movieObserver);
//   }
  

//   getRandomItems(arr: Data[], count: number): Data[] {
//     const shuffled = arr.sort(() => 0.5 - Math.random());
//     return shuffled.slice(0, count);
//   }

//   loadGenres(): void {
//     const genreObserver: Observer<{ genres: Genre[] }> = {
//       next: (response) => {
//         if (response.genres && Array.isArray(response.genres)) {
//           console.log('Gêneros carregados:', response.genres);
//           this.genres = response.genres;
//           this.genres.forEach((genre) => {
//             this.loadArticlesByGenre(genre);
//           });
//         } else {
//           console.error('Erro: Resposta de gêneros inválida');
//         }
//       },
//       error: (err) => console.error('Erro ao carregar os gêneros:', err),
//       complete: () => console.log('Carregamento de gêneros completo')
//     };
//     this.dataService.getGenresForMovies().subscribe(genreObserver);
//   }
  

//   //loadGenres(): void {
//   //   const genreObserver: Observer<Genre[]> = {
//   //     next: (genres) => {
//   //       if (genres) {
//   //         console.log('Generos carregados:', genres);
//   //         this.genres = genres;
//   //         this.genres.forEach((genre) => {
//   //           this.loadArticlesByGenre(genre);
//   //         });
//   //       }
//   //     },
//   //     error: (err) => console.error('Erro ao carregar os gêneros:', err),
//   //     complete: () => { }
//   //   };
//   //   this.dataService.getGenresForMovies().subscribe(genreObserver);
//   // }

//   loadArticlesByGenre(genre: Genre): void {
//     const articleObserver: Observer<Data[]> = {
//       next: (articles) => {
//         if (articles) {
//           this.dataByGenre[genre.name] = articles;
//         }
//       },
//       error: (err) => console.error(`Erro ao carregar artigos para o gênero ${genre.name}:`, err),
//       complete: () => console.log(`Carregamento de artigos para o gênero ${genre.name} completo`)
//     };
//     this.dataService.getMoviesByGenre(genre.name).subscribe(articleObserver);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { DataService, Data, Genre } from 'src/app/services/data.service';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  mainData: Data[] = [];
  genres: Genre[] = [];
  dataByGenre: { [key: string]: Data[] } = {};

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadMainArticles();
    this.loadGenres();
  }

  loadMainArticles(): void {
    const allData: Data[] = [];
    const movieObserver: Observer<Data[]> = {
      next: (movies) => {
        if (Array.isArray(movies)) {
          allData.push(...movies);
          this.dataService.getAllSeries().subscribe({
            next: (series) => {
              if (Array.isArray(series)) {
                allData.push(...series);
                this.mainData = this.getRandomItems(allData, 6);
              } else {
                console.error('Erro: Dados de séries não são um array');
              }
            },
            error: (err) => console.error('Erro ao carregar séries:', err),
          });
        } else {
          console.error('Erro: Dados de filmes não são um array');
        }
      },
      error: (err) => console.error('Erro ao carregar filmes:', err),
      complete: () => { }
    };
    this.dataService.getAllMovies().subscribe(movieObserver);
  }

  getRandomItems(arr: Data[], count: number): Data[] {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  loadGenres(): void {
    const genreObserver: Observer<{ genres: Genre[] }> = {
      next: (response) => {
        if (response.genres && Array.isArray(response.genres)) {
          console.log('Gêneros carregados:', response.genres);
          this.genres = response.genres;
          this.genres.forEach((genre) => {
            this.loadArticlesByGenre(genre);
          });
        } else {
          console.error('Erro: Resposta de gêneros inválida');
        }
      },
      error: (err) => console.error('Erro ao carregar os gêneros:', err),
      complete: () => console.log('Carregamento de gêneros completo')
    };
    this.dataService.getGenresForMovies().subscribe(genreObserver);
  }

  loadArticlesByGenre(genre: Genre): void {
    const articleObserver: Observer<Data[]> = {
      next: (articles) => {
        if (Array.isArray(articles)) {
          console.log(`Artigos carregados para o gênero ${genre.name}:`, articles);
          this.dataByGenre[genre.name] = articles;
        } else {
          console.error(`Erro: Artigos não são um array para o gênero ${genre.name}`);
        }
      },
      error: (err) => console.error(`Erro ao carregar artigos para o gênero ${genre.name}:`, err),
      complete: () => console.log(`Carregamento de artigos para o gênero ${genre.name} completo`)
    };
    this.dataService.getMoviesByGenre(genre.id).subscribe(articleObserver);  // Aqui usamos o gênero ID
  }
}


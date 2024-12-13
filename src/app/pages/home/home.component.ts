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
    const movieObserver: Observer<{ results: Data[] }> = {
      next: (response) => {
        if (response.results && Array.isArray(response.results)) {
          // Construir URLs completas das imagens e atribuir títulos
          response.results.forEach(article => {
            article.photoCover = `https://image.tmdb.org/t/p/w500${article.poster_path}`;
            article.cardTitle = article.title;
          });
          allData.push(...response.results);
          console.log('Filmes carregados:', response.results); // Adicionar log para filmes
          this.dataService.getAllSeries().subscribe({
            next: (seriesResponse) => {
              if (seriesResponse.results && Array.isArray(seriesResponse.results)) {
                seriesResponse.results.forEach(series => {
                  series.photoCover = `https://image.tmdb.org/t/p/w500${series.poster_path}`;
                  series.cardTitle = series.title;
                });
                allData.push(...seriesResponse.results);
                this.mainData = this.getRandomItems(allData, 6);
                console.log('Séries carregadas:', seriesResponse.results); // Adicionar log para séries
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
    const articleObserver: Observer<{ results: Data[] }> = {
      next: (response) => {
        if (response.results && Array.isArray(response.results)) {
          // Construir URLs completas das imagens e atribuir títulos
          response.results.forEach(article => {
            article.photoCover = `https://image.tmdb.org/t/p/w500${article.poster_path}`;
            article.cardTitle = article.title;
          });
          console.log(`Artigos carregados para o gênero ${genre.name}:`, response.results);
          this.dataByGenre[genre.name] = response.results;
        } else {
          console.error(`Erro: Artigos não são um array para o gênero ${genre.name}`);
        }
      },
      error: (err) => console.error(`Erro ao carregar artigos para o gênero ${genre.name}:`, err),
      complete: () => console.log(`Carregamento de artigos para o gênero ${genre.name} completo`)
    };
    this.dataService.getMoviesByGenre(genre.id).subscribe(articleObserver);
  }
}


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

//   loadMainArticles(): void {
//     const allData: Data[] = [];
//     const movieObserver: Observer<{ results: Data[] }> = {
//       next: (response) => {
//         if (response.results && Array.isArray(response.results)) {
//           // Construir URLs completas das imagens
//           response.results.forEach(article => {
//             article.photoCover = `https://image.tmdb.org/t/p/w500${article.photoCover}`;
//             article.cardTitle = article.cardTitle;
//           });
//           allData.push(...response.results);
//           console.log('Filmes carregados:', response.results); // Adicionar log para filmes
//           this.dataService.getAllSeries().subscribe({
//             next: (seriesResponse) => {
//               if (seriesResponse.results && Array.isArray(seriesResponse.results)) {
//                 seriesResponse.results.forEach(series => {
//                   series.photoCover = `https://image.tmdb.org/t/p/w500${series.photoCover}`;
//                   series.cardTitle = series.cardTitle;
//                 });
//                 allData.push(...seriesResponse.results);
//                 this.mainData = this.getRandomItems(allData, 6);
//                 console.log('Séries carregadas:', seriesResponse.results); // Adicionar log para séries
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

//   loadArticlesByGenre(genre: Genre): void {
//     const articleObserver: Observer<{ results: Data[] }> = {
//       next: (response) => {
//         if (response.results && Array.isArray(response.results)) {
//           // Construir URLs completas das imagens
//           response.results.forEach(article => {
//             article.photoCover = `https://image.tmdb.org/t/p/w500${article.photoCover}`;
//             article.cardTitle = article.cardTitle;
//           });
//           console.log(`Artigos carregados para o gênero ${genre.name}:`, response.results);
//           this.dataByGenre[genre.name] = response.results;
//         } else {
//           console.error(`Erro: Artigos não são um array para o gênero ${genre.name}`);
//         }
//       },
//       error: (err) => console.error(`Erro ao carregar artigos para o gênero ${genre.name}:`, err),
//       complete: () => console.log(`Carregamento de artigos para o gênero ${genre.name} completo`)
//     };
//     this.dataService.getMoviesByGenre(genre.id).subscribe(articleObserver);
//   }
// }


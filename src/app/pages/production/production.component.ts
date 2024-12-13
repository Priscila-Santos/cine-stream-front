// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { DataService, Data } from 'src/app/services/data.service';
// import { FavoriteService } from 'src/app/services/favorite.service';
// import { MatDialog } from '@angular/material/dialog';
// import { SearchDialogComponent } from 'src/app/components/search-dialog/search-dialog.component';

// @Component({
//   selector: 'app-production',
//   templateUrl: './production.component.html',
//   styleUrls: ['./production.component.css']
// })
// export class ProductionComponent implements OnInit {
//   data: Data[] = [];
//   genres: { id: number; name: string; }[] = [];
//   currentPage: number = 1;
//   itemsPerPage: number = 15;
//   totalItems: number = 0; // Total number of items
//   totalPages: number = 1; // Total number of pages
//   visiblePages: number[] = []; // Pages visible in the navigation
//   searchQuery: string = ''; // Armazena a busca

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private dataService: DataService,
//     private favoriteService: FavoriteService,
//     public dialog: MatDialog
//   ) {}

//   ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       if (params['query']) {
//         this.searchQuery = params['query'];
//         this.searchContent();
//       } else {
//         this.loadContent();
//       }
//     });
//   }

//   loadContent(): void {
//     const type = this.route.snapshot.data['type'];
//     console.log('Tipo:', type);

//     if (type === 'filmes') {
//       this.dataService.getGenresForMovies().subscribe((response) => {
//         this.genres = response.genres;
//         console.log('Gêneros de filmes:', this.genres);
//         this.dataService.getAllMovies().subscribe((response) => {
//           this.totalItems = response.total_results;
//           this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
//           this.updateVisiblePages();
//           this.data = response.results.map(item => ({
//             ...item,
//             genre_names: this.mapGenres(item.genre_ids)
//           }));
//           console.log('Filmes carregados:', this.data);
//         }, error => {
//           console.error('Erro ao buscar filmes:', error);
//         });
//       }, error => {
//         console.error('Erro ao buscar gêneros de filmes:', error);
//       });
//     } else if (type === 'series') {
//       this.dataService.getGenresForSeries().subscribe((response) => {
//         this.genres = response.genres;
//         console.log('Gêneros de séries:', this.genres);
//         this.dataService.getAllSeries().subscribe((response) => {
//           this.totalItems = response.total_results;
//           this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
//           this.updateVisiblePages();
//           this.data = response.results.map(item => ({
//             ...item,
//             genre_names: this.mapGenres(item.genre_ids)
//           }));
//           console.log('Séries carregadas:', this.data);
//         }, error => {
//           console.error('Erro ao buscar séries:', error);
//         });
//       }, error => {
//         console.error('Erro ao buscar gêneros de séries:', error);
//       });
//     }
//   }

//   searchContent(): void {
//     let type = this.route.snapshot.data['type'];
//     console.log('Tipo de conteúdo:', type);
//     console.log('Consulta de busca:', this.searchQuery);
  
//     // Se o tipo for 'search', definir um comportamento padrão
//     if (type === 'search') {
//       type = this.searchQuery.includes('serie') ? 'series' : 'filmes';  // Ajuste conforme sua lógica de negócio
//       console.log('Tipo redefinido para:', type);
//     }
  
//     if (type !== 'filmes' && type !== 'series') {
//       console.error('Tipo de conteúdo inválido:', type);
//       return;
//     }
  
//     if (type === 'filmes') {
//       this.dataService.getGenresForMovies().subscribe((response) => {
//         this.genres = response.genres;
//         console.log('Gêneros de filmes:', this.genres);
  
//         this.dataService.getMoviesByTitle(this.searchQuery, this.currentPage).subscribe((response) => {
//           this.totalItems = response.total_results; // Acessando total de resultados
//           this.totalPages = response.total_pages; // Acessando total de páginas
//           this.updateVisiblePages();
//           this.data = response.results.map(item => ({
//             ...item,
//             genre_names: this.mapGenres(item.genre_ids)
//           }));
//           console.log('Filmes encontrados:', this.data);
//         }, error => {
//           console.error('Erro ao buscar filmes:', error);
//         });
//       }, error => {
//         console.error('Erro ao buscar gêneros de filmes:', error);
//       });
//     } else if (type === 'series') {
//       this.dataService.getGenresForSeries().subscribe((response) => {
//         this.genres = response.genres;
//         console.log('Gêneros de séries:', this.genres);
  
//         this.dataService.getSeriesByTitle(this.searchQuery, this.currentPage).subscribe((response) => {
//           this.totalItems = response.total_results; // Acessando total de resultados
//           this.totalPages = response.total_pages; // Acessando total de páginas
//           this.updateVisiblePages();
//           this.data = response.results.map(item => ({
//             ...item,
//             genre_names: this.mapGenres(item.genre_ids)
//           }));
//           console.log('Séries encontradas:', this.data);
//         }, error => {
//           console.error('Erro ao buscar séries:', error);
//         });
//       }, error => {
//         console.error('Erro ao buscar gêneros de séries:', error);
//       });
//     }
//   }


//   mapGenres(genreIds: number[]): string[] {
//     if (!this.genres || !Array.isArray(this.genres)) {
//       console.error('Genres não definidos ou não são uma array:', this.genres);
//       return ['Desconhecido'];
//     }
//     if (!genreIds || !Array.isArray(genreIds)) {
//       console.error('Genre IDs não definidos ou não são uma array:', genreIds);
//       return ['Desconhecido'];
//     }
//     return genreIds.map(id => this.genres.find(genre => genre.id === id)?.name || 'Desconhecido');
//   }

//   updateVisiblePages(): void {
//     const visiblePages = 10;
//     const half = Math.floor(visiblePages / 2);
//     let start = Math.max(this.currentPage - half, 1);
//     let end = Math.min(start + visiblePages - 1, this.totalPages);

//     if (end - start + 1 < visiblePages) {
//       start = Math.max(end - visiblePages + 1, 1);
//     }

//     this.visiblePages = Array.from({ length: end - start + 1 }, (_, i) => i + start);
//   }

//   get paginatedArticles(): Data[] {
//     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
//     return this.data.slice(startIndex, startIndex + this.itemsPerPage);
//   }

//   goToPage(page: number): void {
//     if (page >= 1 && page <= this.totalPages) {
//       this.currentPage = page;
//       this.loadPage();
//       this.updateVisiblePages();
//     }
//   }

//   loadPage(): void {
//     if (this.searchQuery) {
//       this.searchContent();
//     } else {
//       this.loadContent();
//     }
//   }

//   toggleFavorite(data: Data): void {
//     if (this.isFavorited(data)) {
//       this.favoriteService.removeFavorite(data);
//     } else {
//       this.favoriteService.addFavorite(data);
//     }
//   }

//   isFavorited(data: Data): boolean {
//     return this.favoriteService.getFavorites().some(fav => fav.id === data.id);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, Data } from 'src/app/services/data.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { MatDialog } from '@angular/material/dialog';
import { SearchDialogComponent } from 'src/app/components/search-dialog/search-dialog.component';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})
export class ProductionComponent implements OnInit {
  data: Data[] = [];
  genres: { id: number; name: string; }[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 15;
  totalItems: number = 0; // Total number of items
  totalPages: number = 1; // Total number of pages
  visiblePages: number[] = []; // Pages visible in the navigation
  searchQuery: string = ''; // Armazena a busca

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private favoriteService: FavoriteService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['query']) {
        this.searchQuery = params['query'];
        this.searchContent();
      } else {
        this.loadContent();
      }
    });
  }

  loadContent(): void {
    const type = this.route.snapshot.data['type'];
    console.log('Tipo:', type);

    if (type === 'filmes') {
      this.dataService.getGenresForMovies().subscribe((response) => {
        this.genres = response.genres;
        console.log('Gêneros de filmes:', this.genres);
        this.dataService.getAllMovies().subscribe((response) => {
          this.totalItems = response.total_results;
          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
          this.updateVisiblePages();
          this.data = response.results.map(item => ({
            ...item,
            genre_names: this.mapGenres(item.genre_ids)
          }));
          console.log('Filmes carregados:', this.data);
        }, error => {
          console.error('Erro ao buscar filmes:', error);
        });
      }, error => {
        console.error('Erro ao buscar gêneros de filmes:', error);
      });
    } else if (type === 'series') {
      this.dataService.getGenresForSeries().subscribe((response) => {
        this.genres = response.genres;
        console.log('Gêneros de séries:', this.genres);
        this.dataService.getAllSeries().subscribe((response) => {
          this.totalItems = response.total_results;
          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
          this.updateVisiblePages();
          this.data = response.results.map(item => ({
            ...item,
            genre_names: this.mapGenres(item.genre_ids)
          }));
          console.log('Séries carregadas:', this.data);
        }, error => {
          console.error('Erro ao buscar séries:', error);
        });
      }, error => {
        console.error('Erro ao buscar gêneros de séries:', error);
      });
    }
  }

  searchContent(): void {
    let type = this.route.snapshot.data['type'];
    console.log('Tipo de conteúdo:', type);
    console.log('Consulta de busca:', this.searchQuery);
  
    // Se o tipo for 'search', definir um comportamento padrão
    if (type === 'search') {
      type = this.searchQuery.includes('serie') ? 'series' : 'filmes';  // Ajuste conforme sua lógica de negócio
      console.log('Tipo redefinido para:', type);
    }
  
    if (type !== 'filmes' && type !== 'series') {
      console.error('Tipo de conteúdo inválido:', type);
      return;
    }
  
    if (type === 'filmes') {
      this.dataService.getGenresForMovies().subscribe((response) => {
        this.genres = response.genres;
        console.log('Gêneros de filmes:', this.genres);
  
        this.dataService.getMoviesByTitle(this.searchQuery, this.currentPage).subscribe((response) => {
          this.totalItems = response.total_results; // Acessando total de resultados
          this.totalPages = response.total_pages; // Acessando total de páginas
          this.updateVisiblePages();
          this.data = response.results.map(item => ({
            ...item,
            genre_names: this.mapGenres(item.genre_ids)
          }));
          console.log('Filmes encontrados:', this.data);
        }, error => {
          console.error('Erro ao buscar filmes:', error);
        });
      }, error => {
        console.error('Erro ao buscar gêneros de filmes:', error);
      });
    } else if (type === 'series') {
      this.dataService.getGenresForSeries().subscribe((response) => {
        this.genres = response.genres;
        console.log('Gêneros de séries:', this.genres);
  
        this.dataService.getSeriesByTitle(this.searchQuery, this.currentPage).subscribe((response) => {
          this.totalItems = response.total_results; // Acessando total de resultados
          this.totalPages = response.total_pages; // Acessando total de páginas
          this.updateVisiblePages();
          this.data = response.results.map(item => ({
            ...item,
            genre_names: this.mapGenres(item.genre_ids)
          }));
          console.log('Séries encontradas:', this.data);
        }, error => {
          console.error('Erro ao buscar séries:', error);
        });
      }, error => {
        console.error('Erro ao buscar gêneros de séries:', error);
      });
    }
  }

  mapGenres(genreIds: number[]): string[] {
    if (!this.genres || !Array.isArray(this.genres)) {
      console.error('Genres não definidos ou não são uma array:', this.genres);
      return ['Desconhecido'];
    }
    if (!genreIds || !Array.isArray(genreIds)) {
      console.error('Genre IDs não definidos ou não são uma array:', genreIds);
      return ['Desconhecido'];
    }
    return genreIds.map(id => this.genres.find(genre => genre.id === id)?.name || 'Desconhecido');
  }

  updateVisiblePages(): void {
    const visiblePages = 10;
    const half = Math.floor(visiblePages / 2);
    let start = Math.max(this.currentPage - half, 1);
    let end = Math.min(start + visiblePages - 1, this.totalPages);

    if (end - start + 1 < visiblePages) {
      start = Math.max(end - visiblePages + 1, 1);
    }

    this.visiblePages = Array.from({ length: end - start + 1 }, (_, i) => i + start);
  }

  get paginatedArticles(): Data[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.data.slice(startIndex, startIndex + this.itemsPerPage);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadPage();
      this.updateVisiblePages();
    }
  }

  loadPage(): void {
    if (this.searchQuery) {
      this.searchContent();
    } else {
      this.loadContent();
    }
  }

  toggleFavorite(data: Data): void {
    if (this.isFavorited(data)) {
      this.favoriteService.removeFavorite(data);
    } else {
      this.favoriteService.addFavorite(data);
    }
  }

  isFavorited(data: Data): boolean {
    return this.favoriteService.getFavorites().some(fav => fav.id === data.id);
  }
}





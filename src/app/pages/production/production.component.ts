import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, Data } from 'src/app/services/data.service';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})
export class ProductionComponent implements OnInit {
  data: Data[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 15;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    // Acessa o tipo diretamente da rota
    const type = this.route.snapshot.data['type'];

    if (type === 'movies') {
      this.dataService.getAllMovies().subscribe((data: Data[]) => {
        this.data = data || [];
      }, error => {
        console.error('Erro ao buscar filmes:', error);
      });
    } else if (type === 'series') {
      this.dataService.getAllSeries().subscribe((data: Data[]) => {
        this.data = data || [];
      }, error => {
        console.error('Erro ao buscar séries:', error);
      });
    }
  }

  get paginatedArticles(): Data[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.data.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage(): void {
    if ((this.currentPage * this.itemsPerPage) < this.data.length) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
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

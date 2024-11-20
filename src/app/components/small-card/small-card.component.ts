import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/services/data.service';
import { GenreService, TmdbGenero } from 'src/app/services/genre.service';

@Component({
  selector: 'app-small-card',
  templateUrl: './small-card.component.html',
  styleUrls: ['./small-card.component.css']
})
export class SmallCardComponent {
  @Input() genre: string = '';
  @Input() articles: Article[] = [];
  genres: TmdbGenero[] = [];

  currentIndex: number = 0;

  constructor(private genreService: GenreService) {}

  ngOnInit() {
    this.genreService.getGenres().subscribe(data => {
      this.genres = data.genres;
    });
  }

  previous() {
    this.currentIndex = (this.currentIndex - 1 + this.articles.length) % this.articles.length;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.articles.length;
  }
}

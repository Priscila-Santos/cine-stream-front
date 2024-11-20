import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TmdbGenero {
  id: number;
  name: string;
}

export interface TmdbListaGenero {
  genres: TmdbGenero[];
}

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private apiUrl = 'http://localhost:8080/api/genres'; // url do endpoint

  constructor(private http: HttpClient) { }

  getGenres(): Observable<TmdbListaGenero> {
    return this.http.get<TmdbListaGenero>(this.apiUrl);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Type {
  filmes: string;
  series: string;
  realityShow: string;
  favoritos: string;
}

export interface Data {
  id: string;
  photoCover: string;
  cardTitle: string;
  cardDescription: string;
  genre: string;
  releaseYear: string;
  duration: string;
  ratings: number; 
  reviewCount: number; 
  cast: string[]; 
  directors: string[]; 
  writers: string[]; 
  synopsis: string; 
  seasons?: number; 
  episodes?: number;
}

export interface Genre {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAllMovies(page: number = 1): Observable<Data[]> {
    return this.http.get<Data[]>(`${this.apiUrl}/filmes/all-filmes?page=${page}`);
  }

  getAllSeries(page: number = 1): Observable<Data[]> {
    return this.http.get<Data[]>(`${this.apiUrl}/series/all-series?page=${page}`);
  }

  getMoviesByTitle(title: string, page: number = 1): Observable<Data[]> {
    return this.http.get<Data[]>(`${this.apiUrl}/filmes?titulo=${title}&page=${page}`);
  }

  getSeriesByTitle(title: string, page: number = 1): Observable<Data[]> { 
    return this.http.get<Data[]>(`${this.apiUrl}/series?titulo=${title}&page=${page}`); 
  }
 

  getMoviesByGenre(genreId: number, page: number = 1): Observable<Data[]> {
    return this.http.get<Data[]>(`${this.apiUrl}/filmes/por-genero?genreId=${genreId}&page=${page}`);
  }
  
  
  getGenresForMovies(): Observable<{ genres: Genre[] }> {
    return this.http.get<{ genres: Genre[] }>(`${this.apiUrl}/filmes/genres-filmes`);
  }
  

  getSeriesByGenre(genre: string): Observable<Data[]> {
    return this.http.get<Data[]>(`${this.apiUrl}/series/genres-series?genre=${genre}`);
  }


  getGenresForSeries(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.apiUrl}/series/genres-series`);
  }

  getDataById(id: string): Observable<Data> {
    return this.http.get<Data>(`${this.apiUrl}/filmes/${id}`);
  }

  getSeriesDataById(id: string): Observable<Data> {
    return this.http.get<Data>(`${this.apiUrl}/series/${id}`);
  }
}



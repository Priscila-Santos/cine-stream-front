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
  id: number;
  photoCover: string;
  cardTitle: string;
  cardDescription: string;
  genre?: string;
  releaseYear: string;
  duration?: string;
  ratings: number; 
  reviewCount?: number; 
  cast?: string[]; 
  directors?: string[]; 
  writers?: string[]; 
  synopsis: string; 
  seasons?: number; 
  episodes?: number;
  poster_path: string;
  title: string;

  overview: string; 
  release_date: string; 
  vote_average: number;

  first_air_date?: string; // Para séries
  genre_ids: number[]; 
  genre_names?: string[]; 
  name?: string;

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

  getAllMovies(page: number = 1): Observable<{
    total_results: number;results: Data[]
}> {
    return this.http.get<{results: Data[], total_results: number}>(`${this.apiUrl}/filmes/all-filmes?page=${page}`);
  }

  getAllSeries(page: number = 1): Observable<{
    total_results: number;results: Data[]
}> {
    return this.http.get<{results: Data[], total_results: number}>(`${this.apiUrl}/series/all-series?page=${page}`);
  }

  getMoviesByTitle(title: string, page: number = 1): Observable<Data[]> {
    return this.http.get<Data[]>(`${this.apiUrl}/filmes?titulo=${title}&page=${page}`);
  }

  getSeriesByTitle(title: string, page: number = 1): Observable<Data[]> { 
    return this.http.get<Data[]>(`${this.apiUrl}/series?titulo=${title}&page=${page}`); 
  }
 

  getMoviesByGenre(genreId: number, page: number = 1): Observable<{results: Data[]}> {
    return this.http.get<{results: Data[]}>(`${this.apiUrl}/filmes/por-genero?genreId=${genreId}&page=${page}`);
  }

  getGenresForMovies(): Observable<{ genres: { id: number; name: string; }[] }> { 
    return this.http.get<{ genres: { id: number; name: string; }[] }>(`${this.apiUrl}/filmes/genres-filmes`); 
  } 
  
  getGenresForSeries(): Observable<{ genres: { id: number; name: string; }[] }> { 
    return this.http.get<{ genres: { id: number; name: string; }[] }>(`${this.apiUrl}/series/genres-series`); 
  }
  
  
  // getGenresForMovies(): Observable<{ genres: Genre[] }> {
  //   return this.http.get<{ genres: Genre[] }>(`${this.apiUrl}/filmes/genres-filmes`);
  // }

  getSeriesByGenre(genreId: number, page: number = 1): Observable<{results: Data[]}> {
    return this.http.get<{results: Data[]}>(`${this.apiUrl}/series/por-genero?genreId=${genreId}&page=${page}`);
  }



  // getGenresForSeries(): Observable<Genre[]> {
  //   return this.http.get<Genre[]>(`${this.apiUrl}/series/genres-series`);
  // }

  getFilmesDataById(id: string): Observable<Data> {
    return this.http.get<Data>(`${this.apiUrl}/filmes/${id}`);
  }

  getSeriesDataById(id: string): Observable<Data> {
    return this.http.get<Data>(`${this.apiUrl}/series/${id}`);
  }
}



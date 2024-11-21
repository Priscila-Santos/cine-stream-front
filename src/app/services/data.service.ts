import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private apiUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

  getAllMovies(page: number = 1): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}/filmes/todos?page=${page}`);
  }

  getAllSeries(page: number = 1): Observable<Article[]> { return this.http.get<Article[]>(`${this.apiUrl}/series/todas?page=${page}`);
  }

  getMoviesByTitle(title: string, page: number = 1): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}/filmes?titulo=${title}&page=${page}`);
  }

  getSeriesByTitle(title: string, page: number = 1): Observable<Article[]> { 
    return this.http.get<Article[]>(`${this.apiUrl}/series?titulo=${title}&page=${page}`); 
  }


  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl);
  }

  getArticlesByGenre(genre: string): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}?genre=${genre}`)
  }

  getArticleById(id: string): Observable<Article> {
     return this.http.get<Article>(`${this.apiUrl}/${id}`); }
}


export interface Type {
  filme: string;
  serie: string;
  realityShow: string;
  favoritos: string;
}

export interface Article {
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
  episodes?: number
}

export interface Genre {
  id: string;
  name: string;
}

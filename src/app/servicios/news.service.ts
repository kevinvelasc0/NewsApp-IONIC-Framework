import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {map} from 'rxjs/operators'
import { Article, RespuestaEndpoint } from '../models';
import { environment } from '../../environments/environment';
const apiKey = environment.apiKey;
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }
  getNoticiasDestacadas(): Observable<Article[]>{
    return this.http.get<RespuestaEndpoint>(`https://newsapi.org/v2/top-headlines?country=us&category=business`,{
      params:{
        apiKey:apiKey
      }
    }).pipe
    (map(noticias => noticias.articles));
  }
}

import { Component, OnInit } from '@angular/core';
import {NewsService } from '../servicios/news.service'
import {Article} from '../models'
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  public articulos: Article[]=[];
  constructor(private newService: NewsService) {}
  ngOnInit(): void {
    this.getNoticiasDestacadas();
  }

  getNoticiasDestacadas(){
    this.newService.getNoticiasDestacadas().subscribe(articulos => 
      this.articulos.push(...articulos) );
  }

}

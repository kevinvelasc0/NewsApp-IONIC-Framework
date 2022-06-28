import { Component, OnInit } from '@angular/core';
import {NewsService } from '../servicios/news.service'
import {Article} from '../models'
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  public categorias: string[]=['business','entertainment','general','health','science','sports','technology'];
  public seleccionada: string = this.categorias[0];
  public articulos: Article[]=[];
  constructor(private NewsService:NewsService) {}
  
  
  ngOnInit(): void {
    this.NewsService.getNoticiasDestacadasPorCategoria(this.seleccionada).subscribe(articulos=>{
      this.articulos= [...articulos];
    })
  }

  cambiarCategoria(categoria: any){
    this.seleccionada=categoria.detail.value;
      this.NewsService.getNoticiasDestacadasPorCategoria(this.seleccionada).subscribe(articulos=>{
        this.articulos= [...articulos];
      })
  }


}

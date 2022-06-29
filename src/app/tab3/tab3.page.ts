import { Component, OnInit } from '@angular/core';
import {StorageService} from '../servicios/storage.service'
import {Article} from '../models'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  get articulos(): Article[]{
    return this.storageService.getArticulosLocales;
  }
  constructor(private storageService: StorageService) {}
  ngOnInit(): void {
    console.log(this.articulos)
  }
  cargarFavoritos(){

  }

}

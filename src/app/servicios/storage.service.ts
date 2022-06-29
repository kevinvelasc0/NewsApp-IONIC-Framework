import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage-angular';
import { Article } from '../models/index';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage : Storage | null = null;
  private _localArticles: Article[]=[];
  constructor(private storage:Storage, private toast:ToastController ) { 
    this.init();
  }
  async init(){
    const storage = await this.storage.create();
    this._storage = storage;
    this.cargarFavoritos();
  }
  async saveOrRemove(articulo: Article){
    const existe = this._localArticles.find(localarticle =>
        localarticle.title === articulo.title 
    );
    if (existe){
      this._localArticles=this._localArticles.filter(localarticle =>
        localarticle.title !== articulo.title
      )
      const toast = await this.toast.create({
        message: 'Se ha removido de favoritos',
        duration: 2000
      });
      toast.present();
    }else{
      this._localArticles = [articulo,...this._localArticles];
      const toast = await this.toast.create({
        message: 'Se ha agregado a favoritos',
        duration: 2000
      });
      toast.present();
    }
    
    this._storage.set('articles', this._localArticles);
  }
  async cargarFavoritos(){
    try{
      const articulos = await this._storage.get('articles');
      this._localArticles = articulos || []
    }catch (error){

    }
  }

  get getArticulosLocales(){
    return [...this._localArticles]
  }
}

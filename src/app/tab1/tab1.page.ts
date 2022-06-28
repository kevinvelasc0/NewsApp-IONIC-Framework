import { Component, OnInit } from '@angular/core';
import {NewsService } from '../servicios/news.service'
import {Article} from '../models'
import { ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  public articulos: Article[]=[];
  
  constructor(
    
    private newService: NewsService,  
    private actionSheet:ActionSheetController,
    private socialSharing: SocialSharing, 
    private platform: Platform,
    private inApp: InAppBrowser
    
    )   { }
  ngOnInit(): void {
    this.getNoticiasDestacadas();
  }

  getNoticiasDestacadas(){
    this.newService.getNoticiasDestacadas().subscribe(articulos => 
      this.articulos.push(...articulos) );
  }

  async opciones(articulo){
    const actionSheet = await this.actionSheet.create({
      header: 'Opciones',
      buttons: [{
        text: 'Compartir',
        icon: 'share-outline',
        handler: () => this.compartir(articulo)
      },{
        text: 'Cancelar',
        icon: 'close-outline',
        role: 'cancel'
      }]
    })
    await actionSheet.present();
  }

  compartir(articulo){
    
    const {title,source,url} = articulo;
    this.socialSharing.share(
      title,
      source.name,
      null,
      url
    );
  }

  abrirEnlace(articulo){
    if(this.platform.is('ios') || this.platform.is('android')){
      const browser = this.inApp.create(articulo.url);
      browser.show();
      return
    }  
    
    window.open(articulo.url, '_blank');
  }

}

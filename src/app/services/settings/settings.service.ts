import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default',
  }

  constructor(
    @Inject(DOCUMENT) private _document: Document) { 
    this.cargarAjustes();
  }

  guardarAjustes(){
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }
  cargarAjustes(){
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes')??'');    
      console.log('Cargando ajustes...');
      this.aplicarTema(this.ajustes.tema);
    }else{
      console.log('Cargando valores por defecto...');
    }
  }

  aplicarTema(tema: string) {
    let domElement = this._document.getElementById('tema');
    let url: string = `assets/css/colors/${tema}.css`;
    domElement?.setAttribute('href', url);
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
    this.guardarAjustes();
  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}

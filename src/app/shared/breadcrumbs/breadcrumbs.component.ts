import { Component, OnInit } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string = '';
  constructor(private router: Router,
              private title: Title,
              private meta: Meta) {
    
    this.getDataRoute().subscribe(event => {
      console.log(event)
      this.titulo = event.titulo;
      this.title.setTitle(event.titulo);
      const metaTag: MetaDefinition = {
        name: 'Description',
        content: this.titulo
      }
      this.meta.updateTag(metaTag);
    });
      
  }

  ngOnInit() {
  }
  
  getDataRoute():Observable<any> {
    return this.router.events.pipe(
      filter((evento: any) => (typeof evento.snapshot != "undefined" && evento.snapshot.url.length === 1)),
      map((evento: any) =>{
        return evento.snapshot.data;
      })
    );
  }
}

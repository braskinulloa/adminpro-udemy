import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit {
  
  subscription: Subscription;

  constructor() {
    this.subscription =  this.regresaObservable()
    .subscribe( 
      num => console.log('Observer cont: ', num),
      error => console.error('Observer error: ', error),
      () => console.info('Observer ended')      
    );
  }

  ngOnInit(): void {
  }
  ngOnDestroy(){
    console.log('La pagina se va a cerrar');
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any>{
    return new Observable<any>(observer => {
      let contador = 0;
      let intervalo = setInterval(()=>{
        contador+=1;
        const salida = {
          valor: contador
        }
        observer.next(salida);
        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }
        // if (contador === 2) {
        //   clearInterval(intervalo);
        //   observer.error('Algo paso!');
        // }

      }, 1000)
    }).pipe(
      map(resp => resp.valor),
      filter((value, index)=>{
        if (value%2 === 1) {
          //impar
          return true;
        }else{
          //par
          return false;
        }
      })
      // retry(2)
    );
  }
}

import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval'
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/merge'
import 'rxjs/add/operator/startWith'
import 'rxjs/add/operator/scan'
import 'rxjs/add/operator/mapTo'
import { Subject } from 'rxjs/Subject'
import { Store } from '@ngrx/store'
import { SECOND, HOUR } from './reducer'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  click$ = new Subject()
  .map((value: string) => ({type: HOUR, payload: parseInt(value)}))

seconds$ = Observable
  .interval(1000)
  .mapTo({type: SECOND, payload: 1})

time

constructor(store: Store<any>) {
  this.time = store.select('clock')


  Observable.merge(
      this.click$,
      this.seconds$
  )
      .subscribe(store.dispatch.bind(store))
}
}


/** Esta fue la funcion principal que pase a un store no me funciono la funcion 
 * porque de alguna manera el observer esperaba un string y cuando pase un tipo date 
 * marcaba error
 *  this.clock = Observable.merge(
              this.click$.mapTo('hour'),
              Observable.interval(1000).mapTo('second')
          )
              .startWith(new Date())
              .scan((acc:Date, curr)=> {
                  const date = new Date(acc.getTime());
  
                  if(curr === 'second'){
                      date.setSeconds(date.getSeconds() + 1);
                  }
  
                  if(curr === 'hour'){
                      date.setHours(date.getHours() + 1);
                  }
  
                  return date;
              });
 */
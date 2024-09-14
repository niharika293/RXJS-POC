import { Component, OnInit } from '@angular/core';
import { from, fromEvent, interval, Observable, of, range,  } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rxjs';
  // myObservable - emiting stream of values. {DATA STREAM} BAsic Observable creation.
  myObservable = new Observable((subscriber) => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    subscriber.next(4);
    subscriber.complete();
  });

  // Advanced observable creation - using creation functions. 



  constructor(){

  }

  ngOnInit(): void {
    this.subscribeToObservable();
  }

  // To consume from observable, subscribe to it. 
  subscribeToObservable(){
    this.myObservable.subscribe({
      next : (x) => console.log("Got value : " + x),
      error : (err) => console.error("Something went wrong" + err),
      complete : () => console.log("Done!")
    });
    // of : to emit a sequence of values / value passed along as arguments.
    const dataUsingOf = of("A", "B", "C");
    dataUsingOf.subscribe(x => console.log(x));
    const numericDataUsingOf = of(50);
    numericDataUsingOf.subscribe(x => console.log(x));
    // from : converts [] / promises / iterables into observables. 
    const dataUsingFrom = from(['Cricket', 'Tennis', 'Football']);
    dataUsingFrom.subscribe((x) => console.log(x));

    const urlUsingFrom = from('https://api.github.com/users/octocat');
    urlUsingFrom.subscribe((x) => console.log(x));

    // fromEvent : for DOM Events / Node.js Event Emitter

    const click = fromEvent<MouseEvent>(document,'click');
    const positions = click.pipe(
      (map(ev  => `Position : (${ev.clientX}, ${ev.clientY})`))
    );
    positions.subscribe(pos => console.log(pos));

    //interval : emits sequential number at every time interval.

    // const intervalData = interval(1000);

    // To emit only 20 values use TAKE operator. 

    const intervalData = interval(1000).pipe(take(20));
    intervalData.subscribe((x) => console.log(x));

    // Tap - used to perform side effects in an observable stream, 
    // - watches the emisssion from the source observable without modifying the source. 
    //to log / debug / trigger actions / saving or updating the data etc.
    
    const taPData = of(1,2,3).pipe(
      tap(value => console.log("value before map : ", value)),
      map((value => value * 10)),
      tap((value) => console.log("value after map :", value))
    ).subscribe((result) => console.log("Result :", result));

    // Pipe - used to chain multiple RXjS operators together in an argument. 
    // use case - Easy tree shakability - Before pipe, the old style used to import the entire RxJS Library, 
    // even if u used a few operators, resulting in  larger bundle sizes.
    // code - more readable, maintanable.
    
    const pipeData = of(1,2,3,4,5).pipe(
      filter(value => value %2 === 0),
      map(value => value * 10)
    ).subscribe((result) => console.log("result from pipe", result));

    // Take - specifies how many values u need from an observalble stream. 
    // Once the specified no. of values are emitted, the observable completes & no further emission happens. 

    const takeData = of(1,2,3,4,5).pipe(
      take(3)
    ).subscribe(result => console.log("result from take", result));

    // range - emits a sequence of numbers in a specified range. Takes 2 parameters - starting no. & count
    // of how many nos. to be emitted.
    
    const rangeData = range(1,50).subscribe((result) => console.log("result from range", result));

  }
}

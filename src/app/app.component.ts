import { Component, OnInit } from '@angular/core';
import { Calculator } from './calculator';

@Component({
  selector: 'test-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ng-testing-services';

  ngOnInit() {
    const calculator = new Calculator();
    const rta = calculator.multiply(3,3);
    console.log(rta === 9);
    const rta2 = calculator.divide(3, 0);
    console.log(rta2 === null);
    console.log(rta2);
  }

}

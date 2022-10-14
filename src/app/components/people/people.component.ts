import { Component, OnInit } from '@angular/core';
import {Person} from "../../model/person.model";

@Component({
  selector: 'test-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  people: Person[] = [
    new Person('Nicolas', 'Molina', 23, 1, 1),
    new Person('Rosa', 'Delgado', 43, 2, 2),
  ]
  selectedPerson: Person | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  choose(person: Person) {
    this.selectedPerson = person;
  }

}

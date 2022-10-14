import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleComponent } from './people.component';
import { PersonComponent } from './../person/person.component';
import {Person} from "../../model/person.model";
import {By} from "@angular/platform-browser";

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleComponent, PersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list test-person components', () => {
    //Arrange
    component.people = [
      new Person('Nicolas', 'Molina', 23, 1, 1),
      new Person('Rosa', 'Delgado', 43, 2, 2),
      new Person('Laura', 'Linares', 23, 1, 1),
      new Person('Berta', 'Suicho', 43, 2, 2),
    ]
    //Act
    fixture.detectChanges();
    const debugElement = fixture.debugElement.queryAll(By.css('test-person'));
    //Assert
    expect(debugElement.length).toEqual(4);
  });

  it('should display person selected', () => {
    component.choose(new Person('Nicolas', 'Molina', 23, 1, 1))
    fixture.detectChanges();
    const debugElement = fixture.debugElement.query(By.css('#uno')).nativeElement;
    const debugElement1 = fixture.debugElement.query(By.css('#dos')).nativeElement;
    expect(debugElement.textContent).toContain(component.selectedPerson?.name);
    expect(debugElement1.textContent).toContain(component.selectedPerson?.age);
  });

  it('should raise selected event when clicked', () => {
    //arrange
    const ButtonDe = fixture.debugElement.query(By.css('test-person .btn-choose'));
    //Act
    ButtonDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    //Assert
    expect(component.selectedPerson).toEqual(component.people[0]);
  });

  it('should render the selectedPerson', () => {
    //arrange
    const ButtonDe = fixture.debugElement.query(By.css('test-person .btn-choose'));
    //Act
    ButtonDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    const liDe = fixture.debugElement.query(By.css('.selectedPerson ul > li'));
    //Assert
    expect(component.selectedPerson).toEqual(component.people[0]);
    expect(liDe.nativeElement.textContent).toContain(component.selectedPerson?.name);
  });
});

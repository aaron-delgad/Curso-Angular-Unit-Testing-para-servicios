import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonComponent} from './person.component';
import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {Person} from "../../model/person.model";

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); //ciclo de vida del componente
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the name be "Aaron"', () => {
    component.person = new Person('Aaron', 'Delgado', 28, 89, 1.4);
    expect(component.person.name).toEqual('Aaron');
  });
  it('should have <h3> with "Hola, {person.name}"', () => {
    //Arrage
    component.person = new Person('Valentina', 'Delgado', 28, 89, 1.4);
    const expectMsg = `Hola, ${component.person.name}`;
    const personDebug: DebugElement = fixture.debugElement;
    const h3Debug: DebugElement = personDebug.query(By.css('h3'));
    const h3: HTMLElement = h3Debug.nativeElement;
    //Act
    fixture.detectChanges();
    //Assert
    expect(h3?.textContent).toEqual(expectMsg);
  });
  it('should have <p> with "Mi altura es, {person.heigth}"', () => {
    //Arrange
    component.person = new Person('Valentina', 'Delgado', 28, 89, 1.4);
    const expectMsg = `Mi altura es, ${component.person.heigth}`;
    const personDebug: DebugElement = fixture.debugElement;
    const pDebug: DebugElement = personDebug.query(By.css('p'));
    const pElement: HTMLElement = pDebug.nativeElement;
    //Act
    fixture.detectChanges();
    //Assert
    expect(pElement?.textContent).toEqual(expectMsg);
    expect(pElement?.textContent).toContain(component.person.heigth);
  });

  it('should display a text width IMC when call IMC', () => {
    //Arrange
    const expectMsg = 'overweigth level 3';
    component.person = new Person('Juan', 'Perez', 30, 120, 1.65);
    const button = fixture.debugElement.query(By.css('button.btn-imc')).nativeElement;
    //Act
    component.calcIMC();
    fixture.detectChanges();
    //Assert
    expect(button.textContent).toContain(expectMsg);
  });

  it('should display a text width IMC when do click', () => {
    //Arrange
    const expectMsg = 'overweigth level 3';
    component.person = new Person('Juan', 'Perez', 30, 120, 1.65);
    const buttonDe = fixture.debugElement.query(By.css('button.btn-imc'))
    const buttonEl = buttonDe.nativeElement;
    //Act
    buttonDe.triggerEventHandler('click', null)
    fixture.detectChanges();
    //Assert
    expect(buttonEl.textContent).toContain(expectMsg);
  });

  it('should raise selected event when do click', () => {
    //Arrange
    const expectPerson = new Person('Juan', 'Perez', 30, 120, 1.65);
    component.person = expectPerson;
    const buttonDe = fixture.debugElement.query(By.css('button.btn-choose'));

    let selectedPerson: Person | undefined;
    component.onSelected
      .subscribe(person => {
        selectedPerson = person;
      });
    //Act
    buttonDe.triggerEventHandler('click', null)
    fixture.detectChanges();
    //Assert
    expect(selectedPerson).toEqual(expectPerson);
  });
});

@Component({
  template: `<test-person [person]="person" (onSelected)="onSelected($event)"></test-person>`
})
class HostComponent {
  person = new Person('Aaron', 'Delgado', 12, 40, 1.65);
  selectedPerson: Person | undefined;

  onSelected(person: Person) {
    this.selectedPerson = person;
  }
}

describe('PersonComponent from HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, PersonComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); //ciclo de vida del componente
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display person name', () => {
    //Arrange
    const expectName = component.person.name;
    const h3De = fixture.debugElement.query(By.css('test-person h3'));
    const h3El = h3De.nativeElement;
    //Act
    fixture.detectChanges();
    //Assert
    expect(h3El.textContent).toContain(expectName);
  });

  it('should raise selected event when clicked', () => {
    //Arrange
    const btnDe = fixture.debugElement.query(By.css('test-person .btn-choose'));
    //Act
    btnDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    //Assert
    expect(component.selectedPerson).toEqual(component.person);
  });
})

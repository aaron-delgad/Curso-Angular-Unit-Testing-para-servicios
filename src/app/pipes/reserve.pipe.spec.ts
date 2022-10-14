import { ReservePipe } from './reserve.pipe';
import {Component} from "@angular/core";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";

describe('ReservePipe', () => {
  it('create an instance', () => {
    const pipe = new ReservePipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform "roma" to "amor"', () => {
    const pipe = new ReservePipe();
    const rta = pipe.transform("roma");
    expect(rta).toEqual("amor");
  });

  it('should transform "123" to "321"', () => {
    const pipe = new ReservePipe();
    const rta = pipe.transform("123");
    expect(rta).toEqual("321");
  });
});

@Component({
  template: `
    <h5>{{'amor' | reserve}}</h5>
    <input [(ngModel)]="text">
    <p>{{text | reserve}}</p>
  `
})
class HostComponent {
  text = '';
}

describe('ReservePipe from HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, ReservePipe],
      imports: [FormsModule],
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

  it('should the h5 "roma"', () => {
    const h5De = fixture.debugElement.query(By.css('h5'));
    expect(h5De.nativeElement.textContent).toEqual('roma');
  });

  it('should apply reverse pipe when typing in the input', () => {
    const inputDe = fixture.debugElement.query(By.css('input'));
    const inputEl: HTMLInputElement = inputDe.nativeElement;
    const pDe = fixture.debugElement.query(By.css('p'));

    expect(pDe.nativeElement.textContent).toEqual('');

    inputEl.value = 'ANA 2';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(pDe.nativeElement.textContent).toEqual('2 ANA');
  });
})

import { ValueService } from './value.service';
import { TestBed } from '@angular/core/testing';

 describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValueService]
    });
    service = TestBed.inject(ValueService);
  });

  it('should be create', () => {
    expect(service).toBeTruthy();
  });

  describe('tests for getValue', () => {
    it('should return "my value"', () => {
      expect(service.getValue()).toBe('my value');
    });
  });

  describe('test for setValue', () => {
    it('should change the value', () => {
      expect(service.getValue()).toBe('my value');
      service.setValue('change');
      expect(service.getValue()).toBe('change');
    });
  });

  describe('tests for getPromiseValue', () => {
    it('should return "Promise value" from promise with then', (doneFn) => {
      service.getPromiseValue()
      .then((value) => {
        expect(value).toBe('Promise value');
        doneFn();
      });
    });

    it('should return "Promise value" from promise with async', async() => {
      const rta = await service.getPromiseValue();
      expect(rta).toBe('Promise value');
    });
  });

  describe('test for getObservableValue', () => {
    it('should return "Observable value" from observable with then', (doneFn) => {
      service.getObservableValue()
      .subscribe((value) => {
        expect(value).toBe('Observable value');
        doneFn();
      });
    });

    // it('should return "Observable value" from observable with async', async() => {
    //   const rta = await service.getObservableValue();
    //     expect(rta).toBe('Observable value');
    // });
  });
});


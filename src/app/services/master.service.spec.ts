import { MasterService } from './master.service';
import {ValueService} from "./value.service";

import {TestBed} from '@angular/core/testing';

describe('MasterService', () => {
  let masterService: MasterService;
  let valueServiceSpy: jasmine.SpyObj<ValueService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ValueService', ['getValue']);
    TestBed.configureTestingModule({
      providers: [
        MasterService,
        {provide: ValueService, useValue: spy}
      ]
    });
    masterService = TestBed.inject(MasterService);
    valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
  });

  /*Sirve para verificar si el servicio está creado*/
  it('should be create', () => {
    expect(masterService).toBeTruthy();
  });

  /*it('should return "my value" from the real service', () => {
    const valueService = new ValueService();
    const masterService = new MasterService(valueService);
    expect(masterService.getValue()).toBe('my value');
  });*/

  /*it('should return "other value" from the fake service', () => {
    const fakeValueService = new FakeValueService();
    const masterService = new MasterService(fakeValueService as unknown as ValueService);
    expect(masterService.getValue()).toBe('fake value');
  });*/

  /*it('should return "other value" from the fake object', () => {
    const fake = {getValue: () => 'fake from object'};
    const masterService = new MasterService(fake as ValueService);
    expect(masterService.getValue()).toBe('fake from object');
  });*/

  it('should call to getValue from ValueService', () => {
    valueServiceSpy.getValue.and.returnValue('fake value');
    /*aqui verificamos si devuelve el mismo valor que es fake value*/
    expect(masterService.getValue()).toBe('fake value');
    /*aqui solo verificamos que se llame al método*/
    expect(valueServiceSpy.getValue).toHaveBeenCalled();
    /*aqui verificamos verificamos que se llame al método solo una vez*/
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
  });

});

import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { of, defer } from 'rxjs';
import { ProductsComponent } from './products.component';
import { ProductComponent } from './../product/product.component';
import { ProductsService } from './../../services/product.service';
import { ValueService } from './../../services/value.service';
import { generateManyProducts } from './../../model/product.mock';
import {By} from '@angular/platform-browser';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductsService>;
  let valueService: jasmine.SpyObj<ValueService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ProductsService', ['getAll']);
    const valueServicespy = jasmine.createSpyObj('ValueService', ['getPromiseValue']);

    await TestBed.configureTestingModule({
      declarations: [ ProductsComponent, ProductComponent],
      providers: [
        {provide: ProductsService, useValue: spy},
        {provide: ValueService, useValue: valueServicespy},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    valueService = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;

    const productsMock = generateManyProducts(3);
    productService.getAll.and.returnValue(of(productsMock));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(productService.getAll).toHaveBeenCalled();
  });

  describe('test for getAllProducts', () => {
    it('should return product list from service', () => {
      //Arrange
      const productsMock = generateManyProducts(10);
      productService.getAll.and.returnValue(of(productsMock));
      const countPrev = component.products.length;
      //Act
      component.getAllProducts();
      fixture.detectChanges();
      //Assert
      expect(component.products.length).toEqual(productsMock.length + countPrev);
    });

    it('should change the status "loading" => "success"', fakeAsync(() => {
      //Arrange
      const productsMock = generateManyProducts(10);
      productService.getAll.and.returnValue(defer(() => Promise.resolve(productsMock)));
      //Act
      component.getAllProducts();
      fixture.detectChanges();

      expect(component.status).toEqual('loading');
      tick(); //exec, obs, setTimeout, promise
      fixture.detectChanges();
      //Assert
      expect(component.status).toEqual('success');
    }));

    it('should change the status "loading" => "error"', fakeAsync(() => {
      //Arrange
      productService.getAll.and.returnValue(defer(() => Promise.reject('error')));
      //Act
      component.getAllProducts();
      fixture.detectChanges();

      expect(component.status).toEqual('loading');
      tick(4000); //exec, obs, setTimeout, promise
      fixture.detectChanges();
      //Assert
      expect(component.status).toEqual('error');
    }));

    it('should change the status "loading" => "error" when product was clicked', fakeAsync(() => {
      //Arrange
      productService.getAll.and.returnValue(defer(() => Promise.reject('error')));
      const productDe = fixture.debugElement.query(By.css('#product'))
      //Act
      productDe.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(component.status).toEqual('loading');
      tick(4000); //exec, obs, setTimeout, promise
      fixture.detectChanges();
      //Assert
      expect(component.status).toEqual('error');
    }));
  });

  describe('test for callPromise', () => {
    it('should call to promise', async () => {
      //Arrange
      const mockMsg = 'my mock string';
      valueService.getPromiseValue.and.returnValue(Promise.resolve(mockMsg));
      //Act
      await component.callPromise();
      fixture.detectChanges();
      //Asssert
      expect(valueService.getPromiseValue).toHaveBeenCalled();
      expect(component.rta).toEqual(mockMsg);

    });

    it('should show my mock string in p when btn was clicked', fakeAsync(() => {
      //Arrange
      const mockMsg = 'my mock string';
      valueService.getPromiseValue.and.returnValue(Promise.resolve(mockMsg));
      const btnDe = fixture.debugElement.query(By.css('.btn-promise'))
      //Act
      btnDe.triggerEventHandler('click', null);
      tick();
      fixture.detectChanges();
      const rtaDe = fixture.debugElement.query(By.css('p.rta'));
      //Assert
      expect(component.rta).toEqual(mockMsg);
      expect(valueService.getPromiseValue).toHaveBeenCalled();
      expect(rtaDe.nativeElement.textContent).toEqual(mockMsg);
    }));
  });
});

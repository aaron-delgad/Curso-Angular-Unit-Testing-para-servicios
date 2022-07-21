import { TestBed } from '@angular/core/testing';
import { ProductsService } from './product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Product } from '../model/product.model';
import { environment } from './../../environments/environment';
import { generateManyProducts, generateOneProduct } from './../model/product.mock';

fdescribe('ProductService', () => {
    let productService: ProductsService;
    let testingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ProductsService]
        });
        productService = TestBed.inject(ProductsService);
        testingController = TestBed.inject(HttpTestingController);
    });

    it('should be create', () => {
        expect(productService).toBeTruthy();
    });
    //implementación de la prueba para el metodo getAllSimple, se implementa utilizando un mock
    //que va a reemplazar a la petición http
    describe('test for getAllSimple', () => {
        it('should return a product list', (doneFn) => {
            //Arrange
            const mockData: Product[] = generateManyProducts(2);
            //Act. Se está testeando si el numero de elementos es igual al del mock
            productService.getAllSimple().subscribe((data) => {
                //Assert
                expect(data.length).toEqual(mockData.length);
                expect(data).toEqual(mockData);
                doneFn();
            });
            //httpconfig
            const url = `${environment.API_URL}/api/v1/products`;
            const rep = testingController.expectOne(url);
            rep.flush(mockData);
            testingController.verify();
        });
    });
    describe('test for getAll', () => {
      it('should return a product list', (doneFn) => {
        //Arrange
        const mockData: Product[] = generateManyProducts(3);
        //Act. Se está testeando si el numero de elementos es igual al del mock
        productService.getAll().subscribe((data) => {
          //Assert
          expect(data.length).toEqual(mockData.length);

          doneFn();
        });
        //httpconfig
        const url = `${environment.API_URL}/api/v1/products`;
        const rep = testingController.expectOne(url);
        rep.flush(mockData);
        testingController.verify();
      });
      it('should return a product list with taxes', (doneFn) => {
        //Arrange
        const mockData: Product[] = [
          {
            ...generateOneProduct(),
            price: 100, // 100 * .19 = 19
          },
          {
            ...generateOneProduct(),
            price: 200, //200 * .19 = 38
          }
        ];
        //Act. Se está testeando si el numero de elementos es igual al del mock
        productService.getAll().subscribe((data) => {
          //Assert
          expect(data.length).toEqual(mockData.length);
          expect(data[0].taxes).toEqual(19);
          expect(data[1].taxes).toEqual(38);
          doneFn();
        });
        //httpconfig
        const url = `${environment.API_URL}/api/v1/products`;
        const rep = testingController.expectOne(url);
        rep.flush(mockData);
        testingController.verify();
      });
    });
});

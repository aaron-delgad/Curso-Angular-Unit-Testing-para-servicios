import { TestBed } from '@angular/core/testing';
import { ProductsService } from './product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Product, CreateProductDTO, UpdateProductDTO } from '../model/product.model';
import { environment } from './../../environments/environment';
import { generateManyProducts, generateOneProduct } from './../model/product.mock';
import {HTTP_INTERCEPTORS, HttpStatusCode} from "@angular/common/http";
import {TokenService} from "./token.service";
import {TokenInterceptor} from "../interceptors/token.interceptor";

describe('ProductService', () => {
    let productService: ProductsService;
    let testingController: HttpTestingController;
    let tokenService: TokenService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [
              ProductsService,
              TokenService,
              {
                provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
              }
            ]
        });
        productService = TestBed.inject(ProductsService);
        testingController = TestBed.inject(HttpTestingController);
        tokenService = TestBed.inject(TokenService);
    });

    afterEach(() => {
      testingController.verify();
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
            spyOn(tokenService, 'getToken').and.returnValue('123');
            //Act. Se está testeando si el numero de elementos es igual al del mock
            productService.getAllSimple().subscribe((data) => {
                //Assert
                expect(data.length).toEqual(mockData.length);
                expect(data).toEqual(mockData);
                doneFn();
            });
            //httpconfig
            const url = `${environment.API_URL}/api/v1/products`;
            const req = testingController.expectOne(url);
            const headers = req.request.headers;
            expect(headers.get('Authorization')).toEqual('Bearer 123');
            req.flush(mockData);
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
          },
          {
            ...generateOneProduct(),
            price: 0, //0 * .19 = 0
          },
          {
            ...generateOneProduct(),
            price: -100, // = 0
          }
        ];
        //Act. Se está testeando si el numero de elementos es igual al del mock
        productService.getAll().subscribe((data) => {
          //Assert
          expect(data.length).toEqual(mockData.length);
          expect(data[0].taxes).toEqual(19);
          expect(data[1].taxes).toEqual(38);
          expect(data[2].taxes).toEqual(0);
          expect(data[3].taxes).toEqual(0);
          doneFn();
        });
        //httpconfig
        const url = `${environment.API_URL}/api/v1/products`;
        const rep = testingController.expectOne(url);
        rep.flush(mockData);
      });
      it('should send query params with limit 10 and offset 3', (doneFn) => {
        //Arrange
        const mockData: Product[] = generateManyProducts(3);
        const limit = 10;
        const offset = 3;
        //Act. Se está testeando si el numero de elementos es igual al del mock
        productService.getAll(limit, offset)
          .subscribe((data) => {
          //Assert
          expect(data.length).toEqual(mockData.length);

          doneFn();
        });
        //httpconfig
        const url = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`;
        const req = testingController.expectOne(url);
        req.flush(mockData);
        const params = req.request.params;
        expect(params.get('limit')).toEqual(`${limit}`)
        expect(params.get('offset')).toEqual(`${offset}`)
      });
    });
  describe('Test for create',  () => {
    it('should return a new product', (doneFn) => {
      //Arrage
      const mockData = generateOneProduct();
      const dto: CreateProductDTO = {
        title: 'new product',
        price: 100,
        images: ['img'],
        description: 'bla bla bla',
        categoryId: 12
      }
      //Act
      productService.create(dto)
        .subscribe((data) => {
          //Assert
          expect(data).toEqual(mockData);
          doneFn();
        });
      //httpconfig
      const url = `${environment.API_URL}/api/v1/products`;
      const rep = testingController.expectOne(url);
      rep.flush(mockData);
    });
    it('should validate the dto equal al body', (doneFn) => {
      //Arrage
      const mockData = generateOneProduct();
      const dto: CreateProductDTO = {
        title: 'new product',
        price: 100,
        images: ['img'],
        description: 'bla bla bla',
        categoryId: 12
      }
      //Act
      productService.create({...dto})//se debe enviar el objeto a guardar de esta forma para evitar mutaciones
        .subscribe((data) => {
          //Assert
          expect(data).toEqual(mockData);
          doneFn();
        });
      //httpconfig
      const url = `${environment.API_URL}/api/v1/products`;
      const rep = testingController.expectOne(url);
      rep.flush(mockData);
      expect(rep.request.body).toEqual(dto);
    });
    it('should validate que se envie por el method POST', (doneFn) => {
      //Arrage
      const mockData = generateOneProduct();
      const dto: CreateProductDTO = {
        title: 'new product',
        price: 100,
        images: ['img'],
        description: 'bla bla bla',
        categoryId: 12
      }
      //Act
      productService.create({...dto})//se debe enviar el objeto a guardar de esta forma para evitar mutaciones
        .subscribe((data) => {
          //Assert
          expect(data).toEqual(mockData);
          doneFn();
        });
      //httpconfig
      const url = `${environment.API_URL}/api/v1/products`;
      const rep = testingController.expectOne(url);
      rep.flush(mockData);
      expect(rep.request.method).toEqual('POST');
    });
  });
  describe('Test for Update',  () => {
    it('should return a update product', (doneFn) => {
      //Arrage
      const mockData = generateOneProduct();
      const dto: UpdateProductDTO = {
        title: 'new product'
      }
      const productId = '1';
      //Act
      productService.update(productId, dto)
        .subscribe((data) => {
          //Assert
          expect(data).toEqual(mockData);
          doneFn();
        });
      //httpconfig
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const rep = testingController.expectOne(url);
      rep.flush(mockData);
    });
    it('should validate the dto equal al body', (doneFn) => {
      //Arrage
      const mockData = generateOneProduct();
      const dto: UpdateProductDTO = {
        title: 'new product'
      }
      const productId = '1';
      //Act
      productService.update(productId,{...dto})//se debe enviar el objeto a guardar de esta forma para evitar mutaciones
        .subscribe((data) => {
          //Assert
          expect(data).toEqual(mockData);
          doneFn();
        });
      //httpconfig
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const rep = testingController.expectOne(url);
      rep.flush(mockData);
      expect(rep.request.body).toEqual(dto);
    });
    it('should validate que se envie por el method PUT', (doneFn) => {
      //Arrage
      const mockData = generateOneProduct();
      const dto: UpdateProductDTO = {
        title: 'new product'
      }
      const productId = '1';
      //Act
      productService.update(productId,{...dto})//se debe enviar el objeto a guardar de esta forma para evitar mutaciones
        .subscribe((data) => {
          //Assert
          expect(data).toEqual(mockData);
          doneFn();
        });
      //httpconfig
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const rep = testingController.expectOne(url);
      rep.flush(mockData);
      expect(rep.request.method).toEqual('PUT');
    });
  });
  describe('Test for Delete',  () => {
    it('should return a delete product', (doneFn) => {
      //Arrage
      const mockData = true;
      const productId = '1';
      //Act
      productService.delete(productId)
        .subscribe((data) => {
          //Assert
          expect(data).toEqual(mockData);
          doneFn();
        });
      //httpconfig
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const rep = testingController.expectOne(url);
      rep.flush(mockData);
    });
    it('should validate que se envie por el method DELETE', (doneFn) => {
      //Arrage
      const mockData = true;
      const productId = '1';
      //Act
      productService.delete(productId)//se debe enviar el objeto a guardar de esta forma para evitar mutaciones
        .subscribe((data) => {
          //Assert
          expect(data).toEqual(mockData);
          doneFn();
        });
      //httpconfig
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const rep = testingController.expectOne(url);
      rep.flush(mockData);
      expect(rep.request.method).toEqual('DELETE');
    });
  });
  describe('Test for getOne',  () => {
    it('should return a product', (doneFn) => {
      //Arrage
      const mockData: Product = generateOneProduct();
      const productId = '1';
      //Act
      productService.getOne(productId)
        .subscribe((data) => {
          //Assert
          expect(data).toEqual(mockData);
          doneFn();
        });
      //httpconfig
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const rep = testingController.expectOne(url);
      expect(rep.request.method).toEqual('GET');
      rep.flush(mockData);
    });
    it('should return the right msg when the status code is 404', (doneFn) => {
      //Arrage
      const productId = '1';
      const msgError = '404 message';
      const mockError = {
        status: HttpStatusCode.NotFound,
        statusText: msgError
      };
      //Act
      productService.getOne(productId)
        .subscribe( {
          error:(error) => {
            //Assert
            expect(error).toEqual('El producto no existe');
            doneFn();
          }
        });
      //httpconfig
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const rep = testingController.expectOne(url);
      expect(rep.request.method).toEqual('GET');
      rep.flush(msgError, mockError);
    });
    it('should return the right msg when the status code is 401', (doneFn) => {
      //Arrage
      const productId = '1';
      const msgError = '401 message';
      const mockError = {
        status: HttpStatusCode.Unauthorized,
        statusText: msgError
      };
      //Act
      productService.getOne(productId)
        .subscribe( {
          error:(error) => {
            //Assert
            expect(error).toEqual('No estas permitido');
            doneFn();
          }
        });
      //httpconfig
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const rep = testingController.expectOne(url);
      expect(rep.request.method).toEqual('GET');
      rep.flush(msgError, mockError);
    });
    it('should return the right msg when the status code is 409', (doneFn) => {
      //Arrage
      const productId = '1';
      const msgError = '409 message';
      const mockError = {
        status: HttpStatusCode.Conflict,
        statusText: msgError
      };
      //Act
      productService.getOne(productId)
        .subscribe( {
          error:(error) => {
            //Assert
            expect(error).toEqual('Algo esta fallando en el server');
            doneFn();
          }
        });
      //httpconfig
      const url = `${environment.API_URL}/api/v1/products/${productId}`;
      const rep = testingController.expectOne(url);
      expect(rep.request.method).toEqual('GET');
      rep.flush(msgError, mockError);
    });
  });
});

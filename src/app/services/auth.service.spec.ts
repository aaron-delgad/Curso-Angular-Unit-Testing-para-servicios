import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {AuthService} from "./auth.service";
import {TokenService} from "./token.service";
import {environment} from "../../environments/environment";
import {Auth} from "../model/auth.model";

describe('authService', () => {
  let authService: AuthService;
  let testingController: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        AuthService,
        TokenService,
      ]
    });
    authService = TestBed.inject(AuthService);
    testingController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    testingController.verify();
  });

  it('should be create', () => {
    expect(authService).toBeTruthy();
  });
  describe('tests for login', () => {
    it('should return a token', (doneFn) => {
      const mockData: Auth = {
        access_token: '1234567'
      };
      const email = 'radees@gmail.com';
      const password = '12345';
      //Act. Se está testeando si el numero de elementos es igual al del mock
     authService.login(email, password)
       .subscribe((data) => {
        //Assert
        expect(data).toEqual(mockData);
        doneFn();
      });
      //httpconfig
      const url = `${environment.API_URL}/api/v1/auth/login`;
      const req = testingController.expectOne(url);
      req.flush(mockData);
    });
    it('should call a saveToken', (doneFn) => {
      const mockData: Auth = {
        access_token: '1234567'
      };
      const email = 'radees@gmail.com';
      const password = '12345';
      spyOn(tokenService, 'saveToken').and.callThrough();//esto se hace en casos donde el metodo no tiene return
      //Act. Se está testeando si el numero de elementos es igual al del mock
      authService.login(email, password)
        .subscribe((data) => {
          //Assert
          expect(data).toEqual(mockData);
          expect(tokenService.saveToken).toHaveBeenCalledTimes(1);//verificamos que se llame al servicio una vez
          expect(tokenService.saveToken).toHaveBeenCalledOnceWith('1234567');//comparamos el token que se va a guardar
          doneFn();
        });
      //httpconfig
      const url = `${environment.API_URL}/api/v1/auth/login`;
      const req = testingController.expectOne(url);
      req.flush(mockData);
    });
  });
})

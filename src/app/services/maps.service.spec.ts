import { TestBed } from '@angular/core/testing';

import { MapsService } from './maps.service';

fdescribe('MapsService', () => {
  let mapservice: MapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapsService]
    });
    mapservice = TestBed.inject(MapsService);
  });

  it('should be created', () => {
    expect(mapservice).toBeTruthy();
  });

  describe('test for getCurrentPosition', () => {
    it('should save the center', () => {
      //arrange
      spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake((successFn) => {
        const mockGeolocation = {
          coords: {
            accuracy: 0,
            altitude: 0,
            altitudeAccuracy: 0,
            heading: 0,
            latitude: 1000,
            longitude: 2000,
            speed: 0,
          },
          timestamp: 0,
        };
        successFn(mockGeolocation);
      });
      //Act
      mapservice.getCurrentPosition();
      //Asserts
      expect(mapservice.center.lat).toEqual(1000);
      expect(mapservice.center.lng).toEqual(2000);
    });
  });
});

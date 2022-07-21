import { Calculator } from './calculator';

describe('Test for Calculator', () => {
  describe('Test for multiply', () =>{
    it('should return a nine', () => {
      //Arrange --> preparo la prueba con una instancia
      const calculator = new Calculator();
      //Act ---> actuo o ejecuto el proceso de la prueba
      const rta = calculator.multiply(3,3);
      //Assert --> resuelvo la hepotesis para ver si la repuesta es lo que yo espero que salga
      expect(rta).toEqual(9);
    });
  
    it('should return a four', () => {
      //Arrange --> preparo la prueba con una instancia
      const calculator = new Calculator();
      //Act ---> actuo o ejecuto el proceso de la prueba
      const rta = calculator.multiply(1,4);
      //Assert --> resuelvo la hepotesis para ver si la repuesta es lo que yo espero que salga
      expect(rta).toEqual(4);
    });
  });

  describe('Test for dividy', () => {
    it('should return a some numbers', () => {
      //Arrange --> preparo la prueba con una instancia
      const calculator = new Calculator();
      //Act ---> actuo o ejecuto el proceso de la prueba
      expect(calculator.divide(6,3)).toEqual(2);
      expect(calculator.divide(5,2)).toEqual(2.5);
    });
  
    it('divide for zero', () => {
      //Arrange --> preparo la prueba con una instancia
      const calculator = new Calculator();
      //Act ---> actuo o ejecuto el proceso de la prueba
      expect(calculator.divide(6,0)).toBeNull();
      expect(calculator.divide(5,0)).toBeNull();
      expect(calculator.divide(1234523,0)).toBeNull();
    });
  
    it('test matchers', () => {
      let name = 'aaron';
      let name2;
  
      expect(name).toBeDefined();
      expect(name2).toBeUndefined();
  
      expect(1 + 3 === 4).toBeTruthy();
      expect(1 + 3 === 3).toBeFalsy();
  
      expect(5).toBeLessThan(10);
      expect(20).toBeGreaterThan(10);
  
      expect('123456').toMatch(/123/);
      expect(['apples', 'oranges', 'pears']).toContain('oranges');
    });
  });

});

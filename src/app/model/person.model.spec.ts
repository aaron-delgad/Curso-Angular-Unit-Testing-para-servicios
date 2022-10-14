import {Person} from './person.model';

describe('Test for Person', () => {
  let person: Person;
  beforeEach(() => {
    person = new Person('Aaron', 'Delgado', 25, 75, 1.70);
  });
  it('should return valores', () => {
    expect(person.name).toEqual('Aaron');
    expect(person.lastName).toEqual('Delgado');
    expect(person.age).toEqual(25);
    expect(person.weigth).toEqual(75);
    expect(person.heigth).toEqual(1.70);
  });
  describe('Test for calcIMC', () => {
    it('should return a string: down', () => {
      //Arrage
      person.weigth = 40;
      person.heigth = 1.65;
      //Act
      const rpta = person.calcIMC();
      //Assert
      expect(rpta).toEqual('down')
    });
    it('should return a string: normal', () => {
      //Arrage
      person.weigth = 58;
      person.heigth = 1.65;
      //Act
      const rpta = person.calcIMC();
      //Assert
      expect(rpta).toEqual('normal')
    });
    it('should return a string: overweigth', () => {
      //Arrage
      person.weigth = 70;
      person.heigth = 1.65;
      //Act
      const rpta = person.calcIMC();
      //Assert
      expect(rpta).toEqual('overweigth')
    });
    it('should return a string: overweigth level 1', () => {
      //Arrage
      person.weigth = 80;
      person.heigth = 1.65;
      //Act
      const rpta = person.calcIMC();
      //Assert
      expect(rpta).toEqual('overweigth level 1')
    });
    it('should return a string: overweigth level 2', () => {
      //Arrage
      person.weigth = 90;
      person.heigth = 1.65;
      //Act
      const rpta = person.calcIMC();
      //Assert
      expect(rpta).toEqual('overweigth level 2')
    });
    it('should return a string: overweigth level 3', () => {
      //Arrage
      person.weigth = 110;
      person.heigth = 1.65;
      //Act
      const rpta = person.calcIMC();
      //Assert
      expect(rpta).toEqual('overweigth level 3')
    });
  });
});

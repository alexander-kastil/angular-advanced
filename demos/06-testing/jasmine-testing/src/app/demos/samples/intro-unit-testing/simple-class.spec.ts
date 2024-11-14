import { SimpleClass } from './simple-class';

describe('Class - Hello world Test', () => {
  let sc: SimpleClass;

  beforeEach(() => {
    sc = new SimpleClass();
  });

  it('contains 12 characters', () => {
    expect(sc.sayHelloWorld().length).toEqual(12)
  });

  it('says Hello World!', () =>
    expect(sc.sayHelloWorld()).toEqual('Hello World!'));

  it('should create an instance of SimpleClass', () => {
    expect(sc).toBeTruthy();
  });

  it('should return a string from sayHelloWorld method', () => {
    const result = sc.sayHelloWorld();
    expect(typeof result).toBe('string');
  });

  it('should return "Hello World!" from sayHelloWorld method', () => {
    const result = sc.sayHelloWorld();
    expect(result).toBe('Hello World!');
  });
});



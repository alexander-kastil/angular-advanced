import { PhonenumberPipe } from './phonenumber.pipe';

describe('Pipe - Phonenumber', () => {
  let pipe: PhonenumberPipe;

  beforeEach(() => {
    pipe = new PhonenumberPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should display in phone format', () => {
    const phoneNumber = '3333333333';
    const result = pipe.transform(phoneNumber);
    expect(result).toBe('(333) 333 3333');
  });

  it('should display nothing when input is too long', () => {
    const phoneNumber = '333333333344';
    const result = pipe.transform(phoneNumber);
    expect(result).toBe(phoneNumber);
  });
});

import { SimpleMessageService } from './simple.service';

describe('SimpleMessageService', () => {
  let service: SimpleMessageService;

  beforeEach(() => {
    service = new SimpleMessageService();
  });

  it('should add a message', () => {
    const message = 'Test message';
    service.add(message);
    expect(service.messages).toContain(message);
  });

  it('should delete a message', () => {
    const message = 'Test message';
    service.add(message);
    service.delete(message);
    expect(service.messages).not.toContain(message);
  });

  it('should clear all messages', () => {
    service.add('Test message 1');
    service.add('Test message 2');
    service.clear();
    expect(service.messages.length).toBe(0);
  });
});
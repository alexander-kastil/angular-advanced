import { TestBed } from '@angular/core/testing';
import { PersonService } from './person.service';
import { of } from 'rxjs';

describe('PersonService', () => {
    let service: PersonService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PersonService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return persons in sequence', (done) => {
        const expectedPersons = ['Cleo', 'Giro', 'Soi', 'Flora'];
        const persons$ = service.getPersons();
        const receivedPersons: string[] = [];

        persons$.subscribe({
            next: (person) => {
                receivedPersons.push(person);
            },
            complete: () => {
                expect(receivedPersons).toEqual(expectedPersons);
                done();
            }
        });
    });
});
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../environments/environment';
import { FoodItem } from './food.model';
import { FoodService } from './food.service';


describe('FoodService', () => {
  let service: FoodService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FoodService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(FoodService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve food items from the API via GET', () => {
    const dummyFoodItems: FoodItem[] = [
      { id: 1, name: 'Apple', rating: 5, discontinued: false },
      { id: 2, name: 'Banana', rating: 3, discontinued: true }
    ];

    service.getFood().subscribe(foodItems => {
      expect(foodItems.length).toBe(2);
      expect(foodItems).toEqual(dummyFoodItems);
    });

    const req = httpMock.expectOne(`${environment.api}food`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyFoodItems);
  });

  it('should filter out discontinued food items', () => {
    const dummyFoodItems: FoodItem[] = [
      { id: 1, name: 'Apple', rating: 5, discontinued: false },
      { id: 2, name: 'Banana', rating: 3, discontinued: true }
    ];

    service.getAvailableFood().subscribe(foodItems => {
      expect(foodItems.length).toBe(1);
      expect(foodItems[0].name).toBe('Apple');
    });

    const req = httpMock.expectOne(`${environment.api}food`);
    req.flush(dummyFoodItems);
  });

  it('should delete a food item via DELETE', () => {
    const dummyFoodItem: FoodItem = { id: 1, name: 'Apple', rating: 5, discontinued: false };

    service.deleteFood(dummyFoodItem).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${environment.api}food/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should add a food item via PUT', () => {
    const dummyFoodItem: FoodItem = { id: 1, name: 'Apple', rating: 5, discontinued: false };

    service.addFood(dummyFoodItem).subscribe(foodItem => {
      expect(foodItem).toEqual(dummyFoodItem);
    });

    const req = httpMock.expectOne(`${environment.api}food`);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyFoodItem);
  });
});
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { FoodServiceBS } from '../../food/food.service-bs';
import { FoodRowComponent } from '../food-row/food-row.component';
import { FoodListComponent } from './food-list.component';

describe('Component - Integration Test', () => {
  let foodServiceSpy: any;
  const foodData = [
    { name: 'Pad Thai', rating: 5 },
    { name: 'Butter Chicken', rating: 5 },
    { name: 'Cannelloni', rating: 4 },
    { name: 'Cordon Bleu', rating: 2 },
  ];
  const serviceResult = [
    { name: 'Pad Thai', rating: 5 },
    { name: 'Butter Chicken', rating: 5 },
    { name: 'Cannelloni', rating: 4 },
  ];

  const deleteItem = { id: 4, name: 'Cordon Bleu', rating: 2 };

  let fixture: ComponentFixture<FoodListComponent>;
  let comp: FoodListComponent;
  let de: DebugElement;

  beforeEach(() => {
    foodServiceSpy = jasmine.createSpyObj(['getFood', 'deleteFood']);

    const module = {
      providers: [{ provide: FoodServiceBS, useValue: foodServiceSpy }],
      schemas: [NO_ERRORS_SCHEMA],
    };

    TestBed.configureTestingModule(module);
    fixture = TestBed.createComponent(FoodListComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement;
  });

  it('should render each FoodItem as FoodItemRow', () => {
    foodServiceSpy.getFood.and.returnValue(of(foodData));
    fixture.autoDetectChanges();

    const rows = fixture.debugElement.queryAll(By.directive(FoodRowComponent));
    expect(rows.length).toEqual(4);
    expect(rows[0].componentInstance.food().name).toEqual('Pad Thai');
  });

  it('should have three rows when an item is deleted', fakeAsync(() => {
    foodServiceSpy.getFood.and.returnValue(of(foodData));
    fixture.autoDetectChanges();

    spyOn(comp, 'deleteFood');
    const deRow = de.query(By.directive(FoodRowComponent));
    const row = deRow.componentInstance;
    row.delete.emit(deleteItem);

    foodServiceSpy.deleteFood.and.returnValue(of(serviceResult));
    expect(comp.deleteFood).toHaveBeenCalledWith(deleteItem);
  }));
});

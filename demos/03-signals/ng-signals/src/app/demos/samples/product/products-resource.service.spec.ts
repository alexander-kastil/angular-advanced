import { TestBed } from '@angular/core/testing';
import { ProductsResourceService } from './products-resource.service';


describe('ProductsSignalService', () => {
  let service: ProductsResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

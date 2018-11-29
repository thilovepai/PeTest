import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateproductComponent } from './create-product.component';

describe('CreateProductComponent', () => {
  let component: CreateproductComponent;
  let fixture: ComponentFixture<CreateproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

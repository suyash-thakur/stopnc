import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryMobileComponent } from './category-mobile.component';

describe('CategoryMobileComponent', () => {
  let component: CategoryMobileComponent;
  let fixture: ComponentFixture<CategoryMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

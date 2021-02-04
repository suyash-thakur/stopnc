import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreMobileComponent } from './explore-mobile.component';

describe('ExploreMobileComponent', () => {
  let component: ExploreMobileComponent;
  let fixture: ComponentFixture<ExploreMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictMenuComponent } from './district-menu.component';

describe('DistrictMenuComponent', () => {
  let component: DistrictMenuComponent;
  let fixture: ComponentFixture<DistrictMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistrictMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

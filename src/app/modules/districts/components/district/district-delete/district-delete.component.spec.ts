import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictDeleteComponent } from './district-delete.component';

describe('DistrictDeleteComponent', () => {
  let component: DistrictDeleteComponent;
  let fixture: ComponentFixture<DistrictDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistrictDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

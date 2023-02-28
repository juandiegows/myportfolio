import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevitateIconComponent } from './levitate-icon.component';

describe('LevitateIconComponent', () => {
  let component: LevitateIconComponent;
  let fixture: ComponentFixture<LevitateIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevitateIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevitateIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

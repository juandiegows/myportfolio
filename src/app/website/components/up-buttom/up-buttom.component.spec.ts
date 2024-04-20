import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpButtomComponent } from './up-buttom.component';

describe('UpButtomComponent', () => {
  let component: UpButtomComponent;
  let fixture: ComponentFixture<UpButtomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpButtomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpButtomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

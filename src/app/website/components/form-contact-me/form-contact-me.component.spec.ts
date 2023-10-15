import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormContactMeComponent } from './form-contact-me.component';

describe('FormContactMeComponent', () => {
  let component: FormContactMeComponent;
  let fixture: ComponentFixture<FormContactMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormContactMeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormContactMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

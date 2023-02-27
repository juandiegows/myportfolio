import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeDarkLightComponent } from './mode-dark-light.component';

describe('ModeDarkLightComponent', () => {
  let component: ModeDarkLightComponent;
  let fixture: ComponentFixture<ModeDarkLightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeDarkLightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeDarkLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalletteComponent } from './pallette.component';

describe('PalletteComponent', () => {
  let component: PalletteComponent;
  let fixture: ComponentFixture<PalletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PalletteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PalletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

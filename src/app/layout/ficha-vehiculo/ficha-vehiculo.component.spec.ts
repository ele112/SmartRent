import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaVehiculoComponent } from './ficha-vehiculo.component';

describe('FichaVehiculoComponent', () => {
  let component: FichaVehiculoComponent;
  let fixture: ComponentFixture<FichaVehiculoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaVehiculoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

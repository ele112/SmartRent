import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisosPublicadosComponent } from './avisos-publicados.component';

describe('AvisosPublicadosComponent', () => {
  let component: AvisosPublicadosComponent;
  let fixture: ComponentFixture<AvisosPublicadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisosPublicadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisosPublicadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

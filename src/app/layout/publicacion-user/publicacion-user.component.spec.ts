import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionUserComponent } from './publicacion-user.component';

describe('PublicacionUserComponent', () => {
  let component: PublicacionUserComponent;
  let fixture: ComponentFixture<PublicacionUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicacionUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicacionUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

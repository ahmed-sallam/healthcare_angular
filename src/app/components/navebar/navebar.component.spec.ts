import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavebarComponent } from './navebar.component';

describe('NavebarComponent', () => {
  let component: NavebarComponent;
  let fixture: ComponentFixture<NavebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavebarComponent]
    });
    fixture = TestBed.createComponent(NavebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

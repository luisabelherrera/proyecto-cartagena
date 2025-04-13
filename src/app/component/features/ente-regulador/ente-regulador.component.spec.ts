import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnteReguladorComponent } from './ente-regulador.component';

describe('EnteReguladorComponent', () => {
  let component: EnteReguladorComponent;
  let fixture: ComponentFixture<EnteReguladorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnteReguladorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnteReguladorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

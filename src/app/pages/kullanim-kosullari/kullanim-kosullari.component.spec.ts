import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KullanimKosullariComponent } from './kullanim-kosullari.component';

describe('KullanimKosullariComponent', () => {
  let component: KullanimKosullariComponent;
  let fixture: ComponentFixture<KullanimKosullariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KullanimKosullariComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KullanimKosullariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

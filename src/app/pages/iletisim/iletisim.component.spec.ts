import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IletisimComponent } from './iletisim.component';

describe('IletisimComponent', () => {
  let component: IletisimComponent;
  let fixture: ComponentFixture<IletisimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IletisimComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IletisimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

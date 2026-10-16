import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramlarComponent } from './programlar.component';

describe('ProgramlarComponent', () => {
  let component: ProgramlarComponent;
  let fixture: ComponentFixture<ProgramlarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramlarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramlarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramlarCcleanerComponent } from './programlar-ccleaner.component';

describe('ProgramlarCcleanerComponent', () => {
  let component: ProgramlarCcleanerComponent;
  let fixture: ComponentFixture<ProgramlarCcleanerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramlarCcleanerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramlarCcleanerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

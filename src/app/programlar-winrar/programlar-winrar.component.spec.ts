import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramlarWinrarComponent } from './programlar-winrar.component';

describe('ProgramlarWinrarComponent', () => {
  let component: ProgramlarWinrarComponent;
  let fixture: ComponentFixture<ProgramlarWinrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramlarWinrarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramlarWinrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

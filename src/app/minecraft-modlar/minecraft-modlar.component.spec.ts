import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinecraftModlarComponent } from './minecraft-modlar.component';

describe('MinecraftModlarComponent', () => {
  let component: MinecraftModlarComponent;
  let fixture: ComponentFixture<MinecraftModlarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinecraftModlarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinecraftModlarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

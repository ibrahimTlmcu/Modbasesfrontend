import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinecraftModlarSonsurumComponent } from './minecraft-modlar-sonsurum.component';

describe('MinecraftModlarSonsurumComponent', () => {
  let component: MinecraftModlarSonsurumComponent;
  let fixture: ComponentFixture<MinecraftModlarSonsurumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinecraftModlarSonsurumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinecraftModlarSonsurumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

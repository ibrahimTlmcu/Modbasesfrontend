import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbBannerlordXorberaxComponent } from './mb-bannerlord-xorberax.component';

describe('MbBannerlordXorberaxComponent', () => {
  let component: MbBannerlordXorberaxComponent;
  let fixture: ComponentFixture<MbBannerlordXorberaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MbBannerlordXorberaxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MbBannerlordXorberaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

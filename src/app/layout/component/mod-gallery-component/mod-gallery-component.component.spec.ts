import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModGalleryComponent } from './mod-gallery-component.component';

describe('ModGalleryComponentComponent', () => {
  let component: ModGalleryComponent;
  let fixture: ComponentFixture<ModGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [ModGalleryComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ModGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

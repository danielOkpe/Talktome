import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceuserComponent } from './spaceuser.component';

describe('SpaceuserComponent', () => {
  let component: SpaceuserComponent;
  let fixture: ComponentFixture<SpaceuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpaceuserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpaceuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

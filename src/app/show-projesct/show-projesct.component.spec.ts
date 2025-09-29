import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProjesctComponent } from './show-projesct.component';

describe('ShowProjesctComponent', () => {
  let component: ShowProjesctComponent;
  let fixture: ComponentFixture<ShowProjesctComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowProjesctComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowProjesctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

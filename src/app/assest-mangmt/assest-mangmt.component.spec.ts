import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssestMangmtComponent } from './assest-mangmt.component';

describe('AssestMangmtComponent', () => {
  let component: AssestMangmtComponent;
  let fixture: ComponentFixture<AssestMangmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssestMangmtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssestMangmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

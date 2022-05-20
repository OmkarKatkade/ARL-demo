import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlefieldEventsComponent } from './battlefield-events.component';

describe('BattlefieldEventsComponent', () => {
  let component: BattlefieldEventsComponent;
  let fixture: ComponentFixture<BattlefieldEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BattlefieldEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlefieldEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

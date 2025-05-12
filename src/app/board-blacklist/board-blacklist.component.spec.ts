import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardBlacklistComponent } from './board-blacklist.component';

describe('BoardBlacklistComponent', () => {
  let component: BoardBlacklistComponent;
  let fixture: ComponentFixture<BoardBlacklistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoardBlacklistComponent]
    });
    fixture = TestBed.createComponent(BoardBlacklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

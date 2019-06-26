import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupModalDetailComponent } from './popup-modal-detail.component';

describe('PopupModalDetailComponent', () => {
  let component: PopupModalDetailComponent;
  let fixture: ComponentFixture<PopupModalDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupModalDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupModalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightConfigComponent } from './right-config.component';

describe('RightConfigComponent', () => {
  let component: RightConfigComponent;
  let fixture: ComponentFixture<RightConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

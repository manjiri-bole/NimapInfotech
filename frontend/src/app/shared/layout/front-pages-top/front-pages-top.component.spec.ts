import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontPagesTopComponent } from './front-pages-top.component';

describe('FrontPagesTopComponent', () => {
  let component: FrontPagesTopComponent;
  let fixture: ComponentFixture<FrontPagesTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontPagesTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontPagesTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

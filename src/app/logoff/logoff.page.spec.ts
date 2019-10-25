import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoffPage } from './logoff.page';

describe('LogoffPage', () => {
  let component: LogoffPage;
  let fixture: ComponentFixture<LogoffPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoffPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoffPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

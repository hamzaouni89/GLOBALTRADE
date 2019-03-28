import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TikerComponent } from './tiker.component';

describe('TikerComponent', () => {
  let component: TikerComponent;
  let fixture: ComponentFixture<TikerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TikerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TikerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

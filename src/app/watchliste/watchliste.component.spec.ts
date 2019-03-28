import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlisteComponent } from './watchliste.component';

describe('WatchlisteComponent', () => {
  let component: WatchlisteComponent;
  let fixture: ComponentFixture<WatchlisteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchlisteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchlisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

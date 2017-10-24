import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternVectorImageComponent } from './pattern-vector-image.component';

describe('PatternVectorImageComponent', () => {
  let component: PatternVectorImageComponent;
  let fixture: ComponentFixture<PatternVectorImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatternVectorImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatternVectorImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

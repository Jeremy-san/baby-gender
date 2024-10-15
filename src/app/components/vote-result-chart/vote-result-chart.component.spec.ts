import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteResultChartComponent } from './vote-result-chart.component';

describe('VoteResultChartComponent', () => {
  let component: VoteResultChartComponent;
  let fixture: ComponentFixture<VoteResultChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoteResultChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoteResultChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

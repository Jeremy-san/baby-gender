import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderVoteFormComponent } from './gender-vote-form.component';

describe('GenderVoteFormComponent', () => {
  let component: GenderVoteFormComponent;
  let fixture: ComponentFixture<GenderVoteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenderVoteFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenderVoteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

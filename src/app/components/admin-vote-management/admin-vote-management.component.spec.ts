import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVoteManagementComponent } from './admin-vote-management.component';

describe('AdminVoteManagementComponent', () => {
  let component: AdminVoteManagementComponent;
  let fixture: ComponentFixture<AdminVoteManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminVoteManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminVoteManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

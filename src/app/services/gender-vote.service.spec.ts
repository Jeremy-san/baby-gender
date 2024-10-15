import { TestBed } from '@angular/core/testing';

import { GenderVoteService } from './gender-vote.service';

describe('GenderVoteService', () => {
  let service: GenderVoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenderVoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { Component } from '@angular/core';
import { GenderVoteService } from '../../services/gender-vote.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-vote-management',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-vote-management.component.html',
  styleUrl: './admin-vote-management.component.scss'
})
export class AdminVoteManagementComponent {
  votes: any[] = [];

  constructor(private genderVoteService: GenderVoteService) {}

  ngOnInit() {
    this.genderVoteService.getVotes().subscribe((votes: any[]) => {
      this.votes = votes;
    });
  }

  deleteVote(voteId: string) {
    this.genderVoteService.deleteVote(voteId).then(() => {
      console.log('Vote supprimé');
    }).catch((err: any) => {
      console.error('Erreur lors de la suppression', err);
    });
  }
}

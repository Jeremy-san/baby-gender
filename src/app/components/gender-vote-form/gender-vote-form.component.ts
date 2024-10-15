import { Component } from '@angular/core';
import { GenderVoteService } from '../../services/gender-vote.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gender-vote-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './gender-vote-form.component.html',
  styleUrls: ['./gender-vote-form.component.scss']
})
export class GenderVoteFormComponent {
  vote = { name: '', gender: '' };
  voteSuccess = false;
  duplicateName = false;
  alreadyVoted = false;


  constructor(private genderVoteService: GenderVoteService) {}

  submitVote() {
    // Vérifier si le participant a déjà voté
    if (this.alreadyVoted) {
      alert('Vous avez déjà voté !');
      console.log('wrong')
      return;
    }

    // Ajouter le vote
    this.genderVoteService.addVote(this.vote).then(() => {
      // Stocker le nom dans le Local Storage pour empêcher de voter à nouveau
      localStorage.setItem('participantName', this.vote.name);
      
      // Réinitialiser les champs du formulaire
      this.vote = { name: '', gender: '' }; // Réinitialise les champs après soumission
      console.log('verified')
      this.voteSuccess = true;

      setTimeout(() => {
        this.voteSuccess = false;
      }, 1000);
    }).catch((err: any) => {
      console.error('Erreur lors de l\'ajout du vote', err);
    });
  }
}

import { Inject, Injectable } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, query, where, getDocs, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenderVoteService {
   // Méthode pour supprimer un vote
   deleteVote(voteId: string): Promise<void> {
    const voteDocRef = doc(this.firestore, `votes/${voteId}`);
    return deleteDoc(voteDocRef);
  }

  constructor(@Inject(Firestore) private firestore: Firestore) {}

  addVote(vote: { gender: string, name: string }) {
    const votesCollection = collection(this.firestore, 'votes');
    return addDoc(votesCollection, vote).then(() => {
      console.log('Vote ajouté dans Firestore : ', vote);
    }).catch((error) => {
      console.error('Erreur lors de l\'ajout du vote : ', error);
    });
  }
  

  getVotes(): Observable<any[]> {
    const votesCollection = collection(this.firestore, 'votes');
    return collectionData(votesCollection, { idField: 'id' });
  }

  checkDuplicateName(name: string): Observable<boolean> {
    const votesCollection = collection(this.firestore, 'votes');
    const q = query(votesCollection, where('name', '==', name));
    return new Observable<boolean>(observer => {
      getDocs(q).then(snapshot => {
        observer.next(!snapshot.empty);
        observer.complete();
      });
    });
  }
}

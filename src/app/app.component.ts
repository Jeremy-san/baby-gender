import { Component, Inject } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { RouterOutlet } from '@angular/router';
import { GenderVoteFormComponent } from './components/gender-vote-form/gender-vote-form.component';
import { VoteResultChartComponent } from './components/vote-result-chart/vote-result-chart.component';
import { AdminVoteManagementComponent } from "./components/admin-vote-management/admin-vote-management.component";

@Component({
  selector: 'app-root',
  standalone: true,  // AppComponent doit aussi être autonome
  imports: [RouterOutlet, VoteResultChartComponent, GenderVoteFormComponent, AdminVoteManagementComponent],  // Importe les composants standalone ici
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(@Inject(Firestore) private firestore: Firestore) {
    this.testFirebaseConnection();
  }

  title = 'baby-gender';

  async testFirebaseConnection() {
    try {
      const docRef = doc(this.firestore, 'test-collection', 'test-doc');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error connecting to Firebase:", error);
    }
  }
}

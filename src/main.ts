import { bootstrapApplication } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AppComponent } from './app/app.component';
import { environment } from './environment/environment';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Correction de l'import

const appConfig = {
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)), // Initialisation de Firebase
    provideFirestore(() => getFirestore()), provideAnimationsAsync(), // Firestore
  ],
};

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-2685e","appId":"1:348191708637:web:16a34cfeb9979f0dd61234","storageBucket":"simple-crm-2685e.appspot.com","apiKey":"AIzaSyBDf3OoEHzN8FoFcVm3colGNQ15B8hShXw","authDomain":"simple-crm-2685e.firebaseapp.com","messagingSenderId":"348191708637"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};

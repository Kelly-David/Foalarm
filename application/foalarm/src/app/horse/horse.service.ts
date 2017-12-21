import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { User } from '../user';
import { empty } from 'rxjs/Observer';
import { AlertHandlerService } from '../alert-handler.service';
import { Horse } from '../horse';
import { FirestoreService } from '../firestore.service';

@Injectable()
export class HorseService {
  horses$: Observable<Horse[]>;

  constructor(
    private db: FirestoreService,
    private afs: AngularFirestore,
    private alert: AlertHandlerService
  ) {
    // Define the Horse variable
    // this.horses$ = this.afs.collection<Horse>(`horses/`).valueChanges();

    this.horses$ = this.db.colWithIds$('horses');
   }

   // Get horses
   getHorses() {
     return this.horses$;
   }

   // Get a horse instance
   getHorse(key: any) {
     // return this.afs.doc<User>(`horses/${key}`).valueChanges();
     return this.db.doc$(`horses/${key}`);
   }

   saveHorse(horse: Horse) {

   }

   updateHorse(horse: Horse) {

   }


}

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

@Injectable()
export class HorseService {
  horses: Observable<Horse[]>;

  constructor(
    private afs: AngularFirestore,
    private alert: AlertHandlerService
  ) {
    // Define the Horse variable
    this.horses = this.afs.collection<Horse>(`horses/`).valueChanges();
   }

   // Get horses
   getHorses() {
     return this.horses;
   }

}

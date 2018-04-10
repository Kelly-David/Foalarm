import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { empty } from 'rxjs/Observer';
import { FirestoreService } from '../firestore.service';
import { firestore } from 'firebase/app';
import { AuthService } from '../core/auth.service';

@Injectable()
export class DataService {

  data$: Observable<any[]>;

  constructor(
    private db: FirestoreService,
    private afs: AngularFirestore,
    private router: Router,
    private authService: AuthService,
    private realTimeDB: AngularFireDatabase
  ) {}

  /**
   * Returns an observable to Firebase Realtime DB alarm activity list
   * @param key alarm id
   * @param limit number of documents to query (no. of data points to plot)
   */
  getActivityData(key: any, limit = 1800 as number): Observable<any> {
    return this.realTimeDB.list(`/activity/${key}`, ref => ref
                          .limitToLast(limit)).valueChanges();
  }


}

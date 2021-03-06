/*
 * File: firestore.service.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Thursday, 21st December 2017 12:37:00 pm
 * Author: david
 * -----
 * Last Modified: Thursday, 12th April 2018 8:05:02 pm
 * Modified By: david
 * -----
 * Description: Firestore Query Functions
 */

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { timeout } from 'q';

type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;
type DocPredicate<T> = string | AngularFirestoreDocument<T>;

@Injectable()
export class FirestoreService {

  constructor(
    private afs: AngularFirestore,
    private rtdb: AngularFireDatabase
  ) { }

  col<T>(ref: CollectionPredicate<T>, queryFn?): AngularFirestoreCollection<T> {
    return typeof ref === 'string' ? this.afs.collection<T>(ref, queryFn) : ref;
  }

  doc<T>(ref: DocPredicate<T>): AngularFirestoreDocument<T> {
    return typeof ref === 'string' ? this.afs.doc<T>(ref) : ref;
  }

  /**********
   * GET DATA
   *********/
  /**
   * @description Firestore Document snapshot
   */
  doc$<T>(ref: DocPredicate<T>): Observable<T> {
    return this.doc(ref).snapshotChanges().map(doc => {
      return doc.payload.data() as T;
    });
  }

  /**
   * @description Firestore Collection snapshot
   * @param ref
   * @param queryFn
   */
  colSnapShot$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<T[]> {
    return this.col(ref, queryFn).snapshotChanges().map(docs => {
      return docs.map(a => a.payload.doc.data()) as T[];
    });
  }

  /**
   * @description Value Changes Observable
   * @param ref
   * @param queryFn
   */
  col$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<T[]> {
    return this.col(ref, queryFn).valueChanges();
  }

  /**
   * @description Firestore collection snapshot map id to data and return as observable
   * @param ref
   * @param queryFn
   */
  colWithIds$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<any[]> {
    return this.col(ref, queryFn).snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    });
  }

  /**********
   * WRITE DATA
   *********/

   /**
    * @description Return server timestamp
    */
   get timeStamp() {
     return firebase.firestore.FieldValue.serverTimestamp();
   }

   /**
    * @description Updates a firestore doc ref property deleted = true
    * @param ref
    * @param key
    */
   delete<T>(ref: DocPredicate<T>, key?: string) {
     return this.doc(ref + `/${key}`).update({
       deleted: true
     });
   }

   /**
    * @description Updates a firestore doc ref
    * @param ref
    * @param key
    * @param data
    */
   update<T>(ref: DocPredicate<T>, key: string, data: any) {
    return this.doc(ref + `/${key}`).update({
      ...data,
      updatedAt: this.timeStamp
    });
  }

   /**
    * @description Custom set method - add a single doc to a specified collection
    * @param ref
    * @param data
    */
   set<T>(ref: DocPredicate<T>, data: any, id?: string) {
     const timeStamp = this.timeStamp;
     // If we pass an id, don't create one (alarms only)
     const uniqueRef = id ? id : this.afs.createId();
     // If creating a new alarm - create a reference in the Firebase Real Time DB also
     if (ref === 'alarms') { this.setReference('data', uniqueRef, {}); }
     return this.doc(ref + `/${uniqueRef}`).set({
       ...data,
       id: uniqueRef,
       updatedAt: timeStamp,
       createdAt: timeStamp,
       deleted: false
     });
   }

   /**
    * @description sets a data reference ot the alarm
    * @param ref
    * @param key
    * @param data
    */
   setReference<T>(ref: DocPredicate<T>, key, data: any) {
     const timeStamp = this.timeStamp;
     const uniqueRef = key;
     // Create a reference in Firebase Real Time DB
     const realTimeDBRef_Data = this.rtdb.object(`/data/${key}`);
     realTimeDBRef_Data.update({ id: key });
     // Create a reference in Firebase Real Time DB
     const realTimeDBRef_Activity = this.rtdb.object(`/activity/${key}`);
     realTimeDBRef_Activity.update({ id: key });
     return this.doc(ref + `/${key}`).set({
       ...data,
       id: key,
       updatedAt: timeStamp,
       createdAt: timeStamp,
       deleted: false
     });
   }

   /**
    * @description Custom add method - adding to a collection
    * @param ref
    * @param data
    */
   add<T>(ref: CollectionPredicate<T>, data) {
    const timestamp = this.timeStamp;
    const uniqueRef = this.afs.createId();
    return this.col(ref + `/${uniqueRef}`).add({
      ...data,
      id: uniqueRef,
      updatedAt: timestamp,
      createdAt: timestamp
    });
  }

}

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { timeout } from 'q';

type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;
type DocPredicate<T> = string | AngularFirestoreDocument<T>;

@Injectable()
export class FirestoreService {

  constructor(
    private afs: AngularFirestore
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
  doc$<T>(ref: DocPredicate<T>): Observable<T> {
    return this.doc(ref).snapshotChanges().map(doc => {
      return doc.payload.data() as T;
    });
  }

  colSnapShot$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<T[]> {
    return this.col(ref, queryFn).snapshotChanges().map(docs => {
      return docs.map(a => a.payload.doc.data()) as T[];
    });
  }

  // Value Changes Observable
  col$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<T[]> {
    return this.col(ref, queryFn).valueChanges();
  }

  // With Document Ids
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

   // Get Firebase timestamp
   get timeStamp() {
     return firebase.firestore.FieldValue.serverTimestamp();
   }

   delete<T>(ref: DocPredicate<T>, key?: string) {
     return this.doc(ref + `/${key}`).update({
       deleted: true
     });
   }

   update<T>(ref: DocPredicate<T>, key: string, data: any) {
    return this.doc(ref + `/${key}`).update({
      ...data,
      updatedAt: this.timeStamp
    });
  }

   // Custom set method - add a single doc to a specified collection
   set<T>(ref: DocPredicate<T>, data: any) {
     const timeStamp = this.timeStamp;
     const uniqueRef = this.afs.createId();
     return this.doc(ref + `/${uniqueRef}`).set({
       ...data,
       id: uniqueRef,
       updatedAt: timeStamp,
       createdAt: timeStamp,
       deleted: false
     });
   }

   // Custom add method - adding to a collection
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

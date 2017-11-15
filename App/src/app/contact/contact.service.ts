import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Contact } from '../contact';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ContactService {
  subject$ = new BehaviorSubject<string>(undefined);
  contacts$: FirebaseListObservable<Contact[]>;
  contact$: FirebaseObjectObservable<Contact>;

  constructor(private db: AngularFireDatabase) {
    this.contact$ = this.db.object(`contact`);
    this.contacts$ = this.db.list(`contacts`);
   }

  getContact(contactKey: string) {
    return this.db.object(`contacts/${contactKey}`)
    .catch(this.errorHandler);
  }

  getContacts() { // companyKey: string
    // return this.db.list(`contacts`, {
    //   query: {
    //     orderByChild: 'companyKey',
    //     equalTo: this.subject$
    //   }
    // })
    return this.subject$
      .switchMap(companyKey => companyKey === undefined
        ? this.contacts$
        : this.db.list(`companyContacts/${companyKey}`))
      .catch(this.errorHandler);
  }

  // ob$ : Oberservable<Observable[]>
  companyContactsJoin(companyKey) {
    return this.db.list(`companyContacts/${companyKey}`)
    .map(contactKeys => contactKeys
      .map(contact => this.db.object(`contacts/${contact.$key}`)))
    .switchMap(contactObsArray => contactObsArray.lenght >= 1
      ? Observable.combineLatest(contactObsArray)
      : Observable.of([]))
    .catch(this.errorHandler);
  }


  saveContact(contact: Contact) {
    return this.contacts$.push(contact)
    .then(_ => console.log('Success'))
    .catch(error => console.log(error));
  }

  editContact(contact: Contact) {
    let updateContact = {}; // mulitpath update - destructive set.

    updateContact[`contacts/${contact.$key}`] = contact;
    Object.keys(contact.contactCompanies).forEach(companyKey => {
      updateContact[`companyContacts/${companyKey}/${contact.$key}`] = {name: contact.name};
    });

    // return this.contacts$.update(contact.$key, contact)
    return this.db.object('/').update(updateContact)
    .then(_ => console.log('Success'))
    .catch(error => console.log(error));
  }

  deleteContact(contact: Contact) {
    let deleteContact = {}; // mulitpath update - destructive set.

    deleteContact[`contacts/${contact.$key}`] = null;
    Object.keys(contact.contactCompanies).forEach(companyKey => {
      deleteContact[`companyContacts/${companyKey}/${contact.$key}`] = null;
    });

    // return this.contacts$.remove(contact.$key)
    return this.db.object('/').update(deleteContact)
    .then(_ => console.log('Success'))
    .catch(error => console.log(error));
  }

  private errorHandler(error) {
    console.log(error);
    return Observable.throw(error);
  }
}

/*
 * @Author: David Kelly
 * @Date: 2017-10-26 14:59:04
 * @Last Modified time: 2017-10-26 14:59:04
 */
import * as firebase from 'firebase/app'; // ts typings only
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Contact } from '../../contact';
import { CompanyService } from '../../company/company.service';
import { Company } from '../../company';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})

export class ContactEditComponent implements OnInit {
  isNewContact: boolean;
  contactKey: string;
  // contact$: FirebaseObjectObservable<Contact> | Observable<any>;
  contact = {name: '' } as Contact;
  companies$: Observable<Company[]>;
  selectedCompany: Company;
  contactCompanies = [];

  constructor(
    private router: Router, // route after a successful save event
    private activatedRoute: ActivatedRoute, // get params from URL
    private contactService: ContactService,
    private companyService: CompanyService
  ) { }

  ngOnInit() {
    this.companies$ = this.companyService.getCompanies();
    this.contactKey = this.activatedRoute.snapshot.params['id']; // Grab the id from URL params
    this.isNewContact = this.contactKey === 'new'; // True if contactKey is 'new'
    // !this.isNewContact ? this.getContact() : this.contact$ = Observable.of({}) as FirebaseObjectObservable<Contact>;
    if (!this.isNewContact) { this.getContact(); }
  }

  uploadFile(event: any) {
    const file = event.srcElement.files[0];
    const storageRef = firebase.storage().ref(`contacts/${this.contactKey}`);
    storageRef.put(file)
    .then(uploadTask => this.contact.imageURL = uploadTask.downloadURL);
  }

  addCompany() {
    this.contact.contactCompanies[this.selectedCompany.$key] = { name: this.selectedCompany.name };
    this.setContactCompanies();
  }

  getContact() {
    this.contactService.getContact(this.contactKey)
      .subscribe(contact => {
        this.contact = contact;
        this.setContactCompanies();
      });
  }

  setContactCompanies() {
    if (this.contact.contactCompanies == null) { this.contact.contactCompanies = {}; }
    this.contactCompanies = Object.keys(this.contact.contactCompanies).map(key => this.contact.contactCompanies[key]);
  }

  saveContact(contact) {
    const save = this.isNewContact ?
    this.contactService.saveContact(contact) :
    this.contactService.editContact(contact);

    save.then(_ => this.router.navigate([`contact-list`]));
  }

  deleteContact(contact) {
    this.contactService.deleteContact(contact)
    .then(_ => this.router.navigate([`contact-list`]));
  }

}

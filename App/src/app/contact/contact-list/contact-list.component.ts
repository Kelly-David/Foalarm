import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { Contact } from '../../contact';
import { Observable } from 'rxjs/Observable';
import { CompanyService } from '../../company/company.service';
import { Company } from '../../company';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  companies$: Observable<Company[]>;
  contacts$: FirebaseListObservable<Contact[]> | Observable<any>;

  constructor(
    public contactService: ContactService,
    private companyServie: CompanyService
  ) { }

  ngOnInit() {
    this.companies$ = this.companyServie.getCompanies();
    this.getContacts();
  }

  getContacts(companyKey?: string) {
    this.contacts$ = this.contactService.getContacts();
  }

}

import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { CompanyService } from '../company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Company } from '../../company';
import { User } from '../../user';
import { AuthGuard } from '../../auth/auth.guard';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  isNewCompany: boolean;
  companyKey: string;
  company$: FirebaseObjectObservable<Company> | Observable<any>;
  user: User;

  constructor(
    private router: Router, // route after a successful save event
    private activatedRoute: ActivatedRoute, // get params from URL
    private companyService: CompanyService,
    private authGuard: AuthGuard) { }

  ngOnInit() {
    this.user = this.authGuard.user;
    this.companyKey = this.activatedRoute.snapshot.params['id']; // Grab the id from URL params
    this.isNewCompany = this.companyKey === 'new'; // True if companyKey is 'new'
    !this.isNewCompany ? this.getCompany() : this.company$ = Observable.of({}) as FirebaseObjectObservable<Company>;
  }

  getCompany() {
    this.company$ = this.companyService.getCompany(this.companyKey);
  }

  saveCompany(company) {
    const save = this.isNewCompany ?
    this.companyService.saveCompany(company) :
    this.companyService.editCompany(company);

    save.then(_ => this.router.navigate([`company-list`]));
  }

  deleteCompany(company) {
    this.companyService.deleteCompany(company)
    .then(_ => this.router.navigate([`company-list`]));
  }

}

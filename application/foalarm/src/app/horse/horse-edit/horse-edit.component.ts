import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireObject } from 'angularfire2/database';
import { Horse } from '../../horse';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { HorseService } from '../horse.service';
import { AuthService } from '../../core/auth.service';
import { User } from '../../user';

@Component({
  selector: 'app-horse-edit',
  templateUrl: './horse-edit.component.html',
  styleUrls: ['./horse-edit.component.css']
})
export class HorseEditComponent implements OnInit {

  isNewHorse: boolean;
  horseKey: string;
  horse$: Observable<Horse> | Observable<any>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private horseService: HorseService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    // Get the key from the URL param
    this.horseKey = this.activatedRoute.snapshot.params['id'];
    // Is it a new horse
    this.isNewHorse = this.horseKey === 'new';
    // Retrieve the horse instance OR create a new object observable
    !this.isNewHorse ? this.getHorse() : this.horse$ = Observable.of({}) as Observable<Horse>;
    console.log(this.horseKey);
  }

  // Returns an observable of type Horse
  getHorse() {
    this.horse$ = this.horseService.getHorse(this.horseKey);
  }

  saveHorse(horse: Horse) {
    const save = this.isNewHorse ?
    this.horseService.saveHorse(horse)
    : this.horseService.updateHorse(horse);
  }

  deleteHorse() {

  }

}

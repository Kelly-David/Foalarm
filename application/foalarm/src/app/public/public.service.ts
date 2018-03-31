import { Injectable } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Observable } from 'rxjs/Observable';
import { Horse } from '../horse';
import { Router } from '@angular/router';

@Injectable()
export class PublicService {

  private publicHorses$: Observable<Horse[]> | Observable<any> | null;

  constructor(
    private db: FirestoreService,
    private router: Router

  ) { }

  get publicHorses() {
    return this.db.col$('horses', ref => ref
                    .where('deleted', '==', false)
                    .where('public', '==', true)
                    .orderBy('displayName'));
  }

}

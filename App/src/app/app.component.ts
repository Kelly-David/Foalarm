import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/take';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    public authService: AuthService,
  ) {

  }

  // constructor(private db: AngularFireDatabase, private af: AngularFireAuth){
  //   const observable = this.db.object('connected');
  //   observable
  //   .take(2)
  //   .subscribe(
  //     next => console.log('next: ', next),
  //     error => console.log('error: ', error),
  //     () => console.log('completed')
  //   );

  // }

}

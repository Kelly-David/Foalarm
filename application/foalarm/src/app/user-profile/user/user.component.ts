import { Component, OnChanges, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnChanges {

  @Input() uid: any; // The UID of the user
  @Input() user: any; // The UID of auth user
  user$: Observable<{}> | Observable<any>;

  constructor(
    private userService: UserService
  ) { }

  ngOnChanges() {
    this.user$ = this.userService.getUser(this.uid);
  }

  addFriend(uid: string, fullName: string) {
    console.log('Added friend', uid, ' By', this.user);
    return this.userService.addFriend(this.user, {uid: uid, fullName: fullName}, uid);
  }

}

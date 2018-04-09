import { Component, OnChanges, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user.service';

@Component({
  selector: 'app-public-user',
  templateUrl: './public-user.component.html',
  styleUrls: ['./public-user.component.css']
})
export class PublicUserComponent implements OnChanges {

  @Input() uid: any; // The UID of the user
  @Input() user: any; // The UID of auth user
  @Input() authUserFullName: any;
  user$: Observable<{}> | Observable<any>;

  constructor(
    private userService: UserService
  ) { }

  ngOnChanges() {
    this.user$ = this.userService.getUser(this.uid);
  }

  /**
   * Request friend, returns promise
   * @param uid
   * @param fullName
   */
  addFriend(uid: string, fullName: string) {
    return this.userService.requestFriend(this.uid, {uid: this.user, fullName: this.authUserFullName}, this.user);
  }

}

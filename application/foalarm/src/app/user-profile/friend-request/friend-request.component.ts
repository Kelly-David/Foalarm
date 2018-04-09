import { Component, OnChanges, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user.service';

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.css']
})
export class FriendRequestComponent implements OnChanges {

  @Input() uid: any;
  public user$: Observable<any>;

  constructor(
    private us: UserService
  ) { }

  ngOnChanges() {
    this.user$ = this.us.getUser(this.uid);
  }

  /**
   * Request friend, returns promise
   * @param uid
   * @param fullName
   */
  addFriend(uid: string, fullName: string) {
    return this.us.addFriend({uid: this.uid, fullName: fullName}, this.uid);
  }

}

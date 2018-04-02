import { Component, OnChanges, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnChanges {

  @Input() uid: any;
  public friend$: Observable<{}> | Observable<any>;

  constructor(
    private user: UserService
  ) { }

  ngOnChanges() {
    this.friend$ = this.user.getUser(this.uid);
  }

}

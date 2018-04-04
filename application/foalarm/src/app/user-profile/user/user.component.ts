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
  user$: Observable<{}> | Observable<any>;
  friend$: Observable<{}>;

  constructor(
    private userService: UserService
  ) { }

  ngOnChanges() {
    this.user$ = this.userService.getUser(this.uid);
    this.friend$ = this.userService.getFriend(this.uid);
  }

}

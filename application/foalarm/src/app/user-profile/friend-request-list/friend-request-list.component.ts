import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user.service';

@Component({
  selector: 'app-friend-request-list',
  templateUrl: './friend-request-list.component.html',
  styleUrls: ['./friend-request-list.component.css']
})
export class FriendRequestListComponent implements OnInit {

  public requests$: Observable<{}[]> | Observable<any>;

  constructor(
    private us: UserService
  ) { }

  ngOnInit() {
    this.requests$ = this.us.requests();
  }

}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user.service';
import { FilterPipe, FilterDatePipe, FilterUserPipe } from '../../pipes/alert.pipe';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public users$: Observable<{}[]> | Observable<any>;
  term: any;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.users$ = this.userService.allUsers;
  }

}

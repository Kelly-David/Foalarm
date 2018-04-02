import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user.service';
import { FilterPipe, FilterDatePipe, FilterUserPipe } from '../../pipes/alert.pipe';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public users$: Observable<{}[]> | Observable<any>;
  public friends$: Observable<{}[]> | Observable<any>;
  public term: any;
  private param: any;
  public title: string;
  public uString: string;
  public userListView = true as boolean;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.uString = this.auth.uString;
    this.param = this.route.snapshot.params['id'];
    // this.title = this.param ? 'Friends' : 'All Users';
    this.title = this.userListView ? 'All Users' : 'Friends';
    // this.users$ = (this.param === undefined) ? this.userService.users() : this.userService.users(this.param);
    this.users$ = this.userService.users();
    this.friends$ = this.userService.users(this.param);
  }

  public toggleUserList() {
    this.userListView = !this.userListView;
    this.title = this.userListView ? 'All Users' : 'Friends';
  }

}

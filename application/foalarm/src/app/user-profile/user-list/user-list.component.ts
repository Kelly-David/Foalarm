import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user.service';
import { FilterPipe, FilterDatePipe, FilterUserPipe } from '../../pipes/alert.pipe';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public users$: Observable<{}[]> | Observable<any>;
  public term: any;
  private param;
  public title: String;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.param = this.route.snapshot.params['id'];
    this.title = this.param ? 'Friends' : 'All';
    this.users$ = (this.param === undefined) ? this.userService.users() : this.userService.users(this.param);
  }

}

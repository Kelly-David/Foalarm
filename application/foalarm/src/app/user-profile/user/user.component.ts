import { Component, OnChanges, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnChanges {

  @Input() uid: any;
  user$: Observable<{}> | Observable<any>;

  constructor(
    private userService: UserService
  ) { }

  ngOnChanges() {
    this.user$ = this.userService.getUser(this.uid);
  }

}

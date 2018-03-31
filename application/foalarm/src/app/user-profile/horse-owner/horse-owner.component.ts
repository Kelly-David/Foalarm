import { Component, OnChanges, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user.service';

@Component({
  selector: 'app-horse-owner',
  templateUrl: './horse-owner.component.html',
  styleUrls: ['./horse-owner.component.css']
})
export class HorseOwnerComponent implements OnChanges {

  @Input() userKey: any;
  public user$: Observable<any>;

  constructor(private userService: UserService) { }

  ngOnChanges() {
    this.user$ = this.userService.getUser(this.userKey);
  }

}

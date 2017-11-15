import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../auth/auth.guard';
import { Observable } from 'rxjs/Observable';
import { User } from '../user';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(public authGuard: AuthGuard) { }

  ngOnInit() {
    this.user = this.authGuard.user;
  }

}

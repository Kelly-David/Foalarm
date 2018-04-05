import { Component, OnChanges, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PublicService } from '../public.service';

@Component({
  selector: 'app-public-friends-horse-list',
  templateUrl: './public-friends-horse-list.component.html',
  styleUrls: ['./public-friends-horse-list.component.css']
})
export class PublicFriendsHorseListComponent implements OnChanges {

  @Input() friend: any;
  public frHorses$: Observable<any[]>;

  constructor(
    private ps: PublicService
  ) { }

  ngOnChanges() {
    this.frHorses$ = this.ps.friendsHorses(this.friend);
  }

}

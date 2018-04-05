import { Component, OnInit } from '@angular/core';
import { PublicService } from '../public.service';
import { Observable } from 'rxjs/Observable';
import { Horse } from '../../horse';
import { UserService } from '../../user-profile/user.service';

@Component({
  selector: 'app-public-horse-list',
  templateUrl: './public-horse-list.component.html',
  styleUrls: ['./public-horse-list.component.css']
})
export class PublicHorseListComponent implements OnInit {

  public horses$: Observable<Horse[]>;
  public friends$: Observable<any[]>;
  public collapse = false as boolean;
  public isCollapsed: boolean;

  constructor(
    private publicService: PublicService,
    private us: UserService
  ) { }

  ngOnInit() {
    this.horses$ = this.publicService.publicHorses;
    this.friends$ = this.us.friends();
  }

  public toggleCollapse() {
    this.collapse = !this.collapse;
  }

}

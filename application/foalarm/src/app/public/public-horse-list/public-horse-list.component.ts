import { Component, OnInit } from '@angular/core';
import { PublicService } from '../public.service';
import { Observable } from 'rxjs/Observable';
import { Horse } from '../../horse';

@Component({
  selector: 'app-public-horse-list',
  templateUrl: './public-horse-list.component.html',
  styleUrls: ['./public-horse-list.component.css']
})
export class PublicHorseListComponent implements OnInit {

  public horses$: Observable<Horse[]>;
  public horses2$: any;
  public collapse = false as boolean;
  public isCollapsed: boolean;

  constructor(
    private publicService: PublicService
  ) { }

  ngOnInit() {
    this.horses$ = this.publicService.publicHorses;
    this.horses2$ = this.publicService.friendsHorses();
  }

  public toggleCollapse() {
    this.collapse = !this.collapse;
  }

}

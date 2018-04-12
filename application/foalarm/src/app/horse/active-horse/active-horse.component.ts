import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Horse } from '../../horse';
import { HorseService } from '../horse.service';

@Component({
  selector: 'app-active-horse',
  templateUrl: './active-horse.component.html',
  styleUrls: ['./active-horse.component.css']
})
export class ActiveHorseComponent implements OnInit {

  public activeHorses$: Observable<Horse[]> | Observable<any>;
  collapse = false as boolean;

  constructor(
    public horseService: HorseService
  ) { }

  ngOnInit() {
    this.getActiveHorses();
  }

  /**
   * Returns observable to horse collection where state = true
   */
  private getActiveHorses() {
    this.activeHorses$ = this.horseService.getActiveHorses();
  }

  /**
   * Show or hide HTML Collapse
   */
  public toggleCollapse() {
    this.collapse = !this.collapse;
  }

}

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

  getActiveHorses() {
    this.activeHorses$ = this.horseService.getActiveHorses();
  }

  toggleCollapse() {
    this.collapse = !this.collapse;
  }

}

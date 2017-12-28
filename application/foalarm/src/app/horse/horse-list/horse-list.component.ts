import { Component, OnInit } from '@angular/core';
import { Horse } from '../../horse';
import { HorseService } from '../horse.service';
import { AlertHandlerService } from '../../alert-handler.service';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-horse-list',
  templateUrl: './horse-list.component.html',
  styleUrls: ['./horse-list.component.css']
})
export class HorseListComponent implements OnInit {

  public horse = {} as Horse;
  public horses$: Observable<Horse[]> | Observable<any>;

  constructor(
    public horseService: HorseService,
  ) {
  }

  ngOnInit() {
    // TODO remove
    // console.log('OK');
    this.getHorses();
  }

  getHorses() {
    this.horses$ = this.horseService.getHorses();
  }

}

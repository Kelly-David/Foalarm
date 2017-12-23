import { Component, OnInit } from '@angular/core';
import { Horse } from '../../horse';
import { HorseService } from '../horse.service';
import { AlertHandlerService } from '../../alert-handler.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-horse-list',
  templateUrl: './horse-list.component.html',
  styleUrls: ['./horse-list.component.css']
})
export class HorseListComponent implements OnInit {

  public horse = {} as Horse;
  public alertString: string;
  public horses$: Observable<Horse[]>;

  constructor(
    public horseService: HorseService,
    public alert: AlertHandlerService
  ) { }

  ngOnInit() {
    console.log('OK');
    this.getHorses();
  }

  getHorses() {
    this.horses$ = this.horseService.getHorses();
  }

}
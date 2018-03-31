import { Component, OnChanges, Input } from '@angular/core';
import { Horse } from '../../horse';
import { Observable } from 'rxjs/Observable';
import { HorseService } from '../../horse/horse.service';

@Component({
  selector: 'app-public-horse',
  templateUrl: './public-horse.component.html',
  styleUrls: ['./public-horse.component.css']
})
export class PublicHorseComponent implements OnChanges {

  @Input() horseKey: any;

  public horse$: Observable<any>;
  public isCollapsed: Boolean = false;

  constructor( private horseService: HorseService) { }

  ngOnChanges() {
    this.horse$ = this.horseService.getHorse(this.horseKey);
  }

}

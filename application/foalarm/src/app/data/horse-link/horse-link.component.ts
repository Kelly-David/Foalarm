import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Horse } from '../../horse';
import { HorseService } from '../../horse/horse.service';

@Component({
  selector: 'app-horse-link',
  templateUrl: './horse-link.component.html',
  styleUrls: ['./horse-link.component.css']
})
export class HorseLinkComponent implements OnInit {

  @Input() alarm: any;
  horse$: Observable<Horse> | Observable<{}> | null;

  constructor(private horseService: HorseService) { }

  ngOnInit() {
    this.horse$ = this.horseService.getHorse(this.alarm.id);
  }
}

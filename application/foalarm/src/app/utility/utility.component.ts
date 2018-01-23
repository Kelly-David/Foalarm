import { Component, OnInit} from '@angular/core';
import { HorseService } from '../horse/horse.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-utility',
  templateUrl: './utility.component.html',
  styleUrls: ['./utility.component.css']
})
export class UtilityComponent implements OnInit {

  constructor(
    public horseService: HorseService,
  ) { }

  ngOnInit() {
  }

}

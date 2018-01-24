import { Component, OnInit} from '@angular/core';
import { HorseService } from '../horse/horse.service';
import { Observable } from 'rxjs/Observable';
import { MessagingService } from '../messaging.service';

@Component({
  selector: 'app-utility',
  templateUrl: './utility.component.html',
  styleUrls: ['./utility.component.css']
})
export class UtilityComponent implements OnInit {

  message;

  constructor(
    private ms: MessagingService,
    public horseService: HorseService
  ) { }

  ngOnInit() {
    this.ms.getPermission();
    this.ms.receiveMessage();
    this.message = this.ms.currentMessage;
  }

}

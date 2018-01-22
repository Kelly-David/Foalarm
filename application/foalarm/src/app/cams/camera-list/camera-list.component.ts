import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Horse } from '../../horse';
import { DomSanitizer } from '@angular/platform-browser';
import { HorseService } from '../../horse/horse.service';

@Component({
  selector: 'app-camera-list',
  templateUrl: './camera-list.component.html',
  styleUrls: ['./camera-list.component.css']
})
export class CameraListComponent implements OnInit {

  public camera$: Observable<any[]> | Observable<any>;

  constructor(
    private horseService: HorseService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {

    this.getCameras();
  }

  getCameras() {
    this.camera$ = this.horseService.horseCams;
  }
}

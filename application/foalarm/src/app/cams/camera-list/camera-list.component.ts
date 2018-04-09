import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Horse } from '../../horse';
import { DomSanitizer } from '@angular/platform-browser';
import { HorseService } from '../../horse/horse.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-camera-list',
  templateUrl: './camera-list.component.html',
  styleUrls: ['./camera-list.component.css']
})
export class CameraListComponent implements OnInit, OnDestroy {

  public cams$: Observable<any[]> | Observable<any>;

  constructor(
    private horseService: HorseService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {

    this.getCameras();
  }

  ngOnDestroy() {
    console.clear();
  }

  getCameras() {
    this.cams$ = this.horseService.horseCams;
  }

  getSource(videoURL) {
    let source = `${videoURL}`;
    source = source.replace('watch?v=', 'v/');
    return this.sanitizer.bypassSecurityTrustResourceUrl(source);
  }
}

/*
 * File: camera-list.component.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Monday, 22nd January 2018 12:31:21 pm
 * Author: david
 * -----
 * Last Modified: Thursday, 12th April 2018 2:37:45 pm
 * Modified By: david
 * -----
 * Description: Displays a list of camera links
 */

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

  /**
   * Return observable of horses with camera URLs
   */
  private getCameras() {
    this.cams$ = this.horseService.horseCams;
  }

  /**
   * Bypass Angular security to bind camera URL to template
   * @param videoURL
   */
  public getSource(videoURL) {
    let source = `${videoURL}`;
    source = source.replace('watch?v=', 'v/');
    return this.sanitizer.bypassSecurityTrustResourceUrl(source);
  }
}

import { Component, OnInit } from '@angular/core';
import { Horse } from '../../horse';
import { HorseService } from '../horse.service';
import { AlertHandlerService } from '../../alert-handler.service';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../core/auth.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

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
    private sanitizer: DomSanitizer
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

  getStyle(imageUrl) {
    const style = `background-image: url(${imageUrl}) !important; background-size: cover`;
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }

}

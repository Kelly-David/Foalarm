import { Component, OnInit } from '@angular/core';
import { Horse } from '../../horse';
import { HorseService } from '../horse.service';
import { AlertHandlerService } from '../../alert-handler.service';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../core/auth.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { BsModalService } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap';
import { AlarmEditModalComponent } from '../../alarm/alarm-edit-modal/alarm-edit-modal.component';

@Component({
  selector: 'app-horse-list',
  templateUrl: './horse-list.component.html',
  styleUrls: ['./horse-list.component.css']
})
export class HorseListComponent implements OnInit {

  public horse = {} as Horse;
  public horses$: Observable<Horse[]> | Observable<any>;
  bsModalRef: BsModalRef;

  constructor(
    public horseService: HorseService,
    private sanitizer: DomSanitizer,
    private modalService: BsModalService
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

  // Create a model dialog - title is passed as input to the child component.
  openClientModal(id?: string) {
    this.bsModalRef = this.modalService.show(AlarmEditModalComponent, {class: 'modal-dialog'});
    this.bsModalRef.content.parent = 'horse';
    this.bsModalRef.content.key = id;
  }

}

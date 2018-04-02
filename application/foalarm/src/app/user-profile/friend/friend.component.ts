import { Component, OnChanges, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnChanges {

  @Input() uid: any;
  public friend$: Observable<{}> | Observable<any>;
  private bsModalRef: BsModalRef;

  constructor(
    private user: UserService,
    private modalService: BsModalService
  ) { }

  ngOnChanges() {
    this.friend$ = this.user.getUser(this.uid);
  }

  // Create a model dialog - title is passed as input to the child component.
  openClientModal(uid?: string) {
    this.bsModalRef = this.modalService.show(ModalComponent, {class: 'modal-dialog'});
    this.bsModalRef.content.parent = 'user';
    this.bsModalRef.content.key = uid;
  }

}

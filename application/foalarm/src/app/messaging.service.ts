/*
 * File: messaging.service.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Wednesday, 24th January 2018 4:26:16 pm
 * Author: david
 * -----
 * Last Modified: Friday, 13th April 2018 9:00:39 am
 * Modified By: david
 * -----
 * Description: Gets permission from the user to send push notifications.
 */

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class MessagingService {

  public messaging = firebase.messaging();
  public currentMessage = new BehaviorSubject(null);

  constructor(
    private db: AngularFireDatabase,
    private auth: AngularFireAuth
  ) { }

  /**
   * Updates the tokoen ref in Firebase
   * Get the current auth user UID, then update the ref.
   * @param token FCM token
   */
  private updateToken(token) {
    this.auth.authState.take(1).subscribe(user => {
      if (!user) { return; }
      const data = { [user.uid]: token };
      this.db.object('fcmTokens/').update(data);
    });
  }

  /**
   * Get user permission, then save the token in Firebase RTDB
   */
  public getPermission() {
    this.messaging.requestPermission()
    .then(() => {
      console.log('Notifcation permission granted');
      return this.messaging.getToken();
    })
    .then(token => {
      console.log(token);
      this.updateToken(token);
    })
    .catch((error) => {
      console.log('Unable to get permission to notify ', error);
    });
  }

  /**
   * Receive a message and pass it to the subject
   */
  public receiveMessage() {
    this.messaging.onMessage((payload) => {
      console.log('Message received:, ', payload);
      this.currentMessage.next(payload);
    });
  }
}

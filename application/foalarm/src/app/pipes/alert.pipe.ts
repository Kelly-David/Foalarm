/*
 * File: alert.pipe.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Tuesday, 23rd January 2018 8:54:24 am
 * Author: david
 * -----
 * Last Modified: Thursday, 12th April 2018 4:12:25 pm
 * Modified By: david
 * -----
 * Description: Pipes used to transform data objects
 */

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../core/auth.service';

/**
 * Alert Pipe
 */
@Pipe({
  name: 'alert'
})
export class AlertPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}

/**
 * Alert Filter
 * Filters alert objects by horseName (case sensitive)
 */
@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], term ): any {
    return term ? items.filter(item => item.horseName.indexOf(term) !== -1) : items;
  }
}

/**
 * User Filter
 * Filters user objects by fullName (case sensitive)
 */
@Pipe({
  name: 'filterUser',
  pure: false
})
export class FilterUserPipe implements PipeTransform {

  transform(items: any[], term ): any {
    return term ? items.filter(item => item.fullName.indexOf(term) !== -1) : items;
  }
}

/**
 * Date Filter
 */
@Pipe({
  name: 'filterDate',
  pure: false
})
export class FilterDatePipe implements PipeTransform {

  transform(items: any[], date ): any {
    return date ? items.filter(item => item.createdAt.indexOf(date) !== -1) : items;
  }

}

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

/**
 * Filters the auth user from the users list
 */
@Pipe({
  name: 'filterAuthUser'
})
export class FilterAuthUser implements PipeTransform {

  transform(items: any[], user): any {
    if (!items) { return items; }
    return user ? items.filter(item => item.uid !== user) : items;
  }
}

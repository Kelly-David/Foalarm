import { Pipe, PipeTransform } from '@angular/core';

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

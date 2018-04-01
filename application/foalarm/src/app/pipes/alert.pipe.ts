import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alert'
})
export class AlertPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], term ): any {
    return term ? items.filter(item => item.horseName.indexOf(term) !== -1) : items; // Else return all items in collection
  }
}

@Pipe({
  name: 'filterUser',
  pure: false
})
export class FilterUserPipe implements PipeTransform {

  transform(items: any[], term ): any {
    return term ? items.filter(item => item.fullName.indexOf(term) !== -1) : items; // Else return all items in collection
  }
}

@Pipe({
  name: 'filterDate',
  pure: false
})
export class FilterDatePipe implements PipeTransform {

  transform(items: any[], date ): any {
    return date ? items.filter(item => item.createdAt.indexOf(date) !== -1) : items;
  }

}

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

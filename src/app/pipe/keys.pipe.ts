import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({ name: 'keys' })
export class KeysPipe implements PipeTransform {

  transform(items, arg): any {
    if (!items) {
      return items;
    }
    let keys = [];
    for (let key in items) {
      keys.push({key: key, value: items[key]});
    }
    return keys;
  }
}
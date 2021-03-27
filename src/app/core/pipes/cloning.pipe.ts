import {Pipe, PipeTransform} from '@angular/core'

@Pipe({name: 'deepClone'})
export class CloningPipe implements PipeTransform {

  transform(value: any, ...args): any {
    return JSON.parse(JSON.stringify(value))
  }
}

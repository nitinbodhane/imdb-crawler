import { Pipe, PipeTransform } from '@angular/core';
import Movie from './movie';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: Movie[], args: string): Movie[] {
    console.log("çalled sort pipe");
    let result = value.sort(function(a: any, b: any) {
      let field1 = String(a[args]).toLowerCase(); // ignore upper and lowercase
      let field2 = String(b[args]).toLowerCase(); // ignore upper and lowercase
      if (field1 < field2) {
        return -1;
      }
      if (field1 > field2) {
        return 1;
      }
      return 0;
    });
    return result;
  }

}

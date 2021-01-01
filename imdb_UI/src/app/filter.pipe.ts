import { Pipe, PipeTransform } from '@angular/core';
import Movie from './movie';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Movie[], ...args: string[]): Movie[] {
    let searchableValue = args.toString().toLocaleLowerCase();
    let newArr = value.filter(x => {
      return (x.name.toLowerCase().includes(searchableValue) || x.year.toLowerCase().includes(searchableValue) || x.genre.toLowerCase().includes(searchableValue));
    });
    return newArr;
  }

}

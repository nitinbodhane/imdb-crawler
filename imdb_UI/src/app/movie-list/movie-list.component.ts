import { Component, OnInit } from '@angular/core';
import { ImdbServiceService } from '../imdb-service.service';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { SortPipe } from '../sort.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  providers: [
    SortPipe
  ]
})
export class MovieListComponent implements OnInit {
  faSort = faSort;
  filterTerm: string = '';
  movieRecords: any = [];
  dropdownSelect: number = 10;
  dtOptions: any = {};
  dropdown: number[] = [10, 25, 50, 100];
  sortSelected: string = '';

  constructor(private imdbServiceService: ImdbServiceService, private sortPipe: SortPipe, private router: Router) { }

  ngOnInit(): void {
    this.fetchMovieList(this.dropdownSelect);
  }

  fetchMovieList(count: number) {
    console.log('====', typeof count, count);
    this.imdbServiceService.getMovieList(count, (err: any, data: any) => {
      this.movieRecords = data.data;
    });
  }

  refreshTotal(count: number) {
    this.fetchMovieList(count);
  }

  sortTable(value: string) {
    let res = this.sortPipe.transform(this.movieRecords, value);
    console.log(res);
    this.movieRecords = res;
    this.router.navigate(['movie-list']);
  }

}

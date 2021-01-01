import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImdbServiceService {

  constructor(private http: HttpClient) {  }

  getMovieList (count: Number, callback: any) {
    this.http.get(`http://localhost:3000/movies?count=${count}`)
    .subscribe((res)=>{
      console.log('Response in provider ', res);
      callback(null, res);
    }, error => console.error(error));
  }
}

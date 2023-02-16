import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpajaxService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(public http: HttpClient) { }


  public getData(
    url: string, 
    data: any
    ): Observable<any> {
        return this.http.post(
          url, 
          data, 
          { headers: this.headers});
  }
}

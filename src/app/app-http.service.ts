import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

interface Options {
    limit?:number;
}

@Injectable()
export class AppHttpService {
  private url: string;
  private header: Headers;

  constructor (private http: Http) {
    this.setAccessToken();
  }

  setAccessToken () {
    let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjE1YjFkMWMyNzRiNTZmMmJkNWNlMjhlNTdkYjcxY2I4M2YzNDY5NTRiZTVlYzE4OTY2ODJhYTRlNzkyMjVlZDU2YjY5YTBiMDU4OTIxNmExIn0.eyJhdWQiOiIyIiwianRpIjoiMTViMWQxYzI3NGI1NmYyYmQ1Y2UyOGU1N2RiNzFjYjgzZjM0Njk1NGJlNWVjMTg5NjY4MmFhNGU3OTIyNWVkNTZiNjlhMGIwNTg5MjE2YTEiLCJpYXQiOjE0ODQ5MDkzMTgsIm5iZiI6MTQ4NDkwOTMxOCwiZXhwIjoxNDg0OTEyOTE4LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.ep7ZcRnCP-_qJoqfHlTOH0A8JrTvRATe_tAAZcI2hmp6TFl7yprG52dRgeUsjS5xs3s8fILB1FlpdnuYnBT6pjya7_WIiP8qD6LoV2dc1XJivL1RRLBF_iX3LCnEN76JfUAU2BR0d5Y6z4O9jI22XqldsqZnsll46BQ5fp9MkxIXbCb1UJyZyrQAUEFJMZbO4m2MiK5okSFFsTPqLMIPf9uHr0TImxxyGPSfYTc13PcE7igW61h0BM-24SRXgJrT2fvmQwDmr5nr4ATm0PM3jhOV-p5jx9sIz0VleoEWGJmN0gjC0KdJ1vX9OG_58Pm46aR8JaNy6QoQlFfSCWeVqDffH_ICr4pJis9LYOcvN-ExTD2ZV5_zQWCZ-ymSXsfXNqglk16H4qqquJz0zvO-m4eq9jG6KOgnQn7Q4OofOYZqM0wl-wKq8i4FA5u56xHVHOPGIXYtFyustYQiapPFD_-OZWIgk0tJfOpYufZmLHUf8ydGcUKmS79SFePUgXRERAnzI2pjFX0XNWkLEYJv_8DGn97u0ZFIekfe1xBY_QVrQqf4EakcuPOJ76PhY71v05A2KQNdpU527CZIMAY8CnxbY2-SrSlCmgZXa_lce2lkiLJaW_gomOZLmebtPrECFrmUGwgcdRzOm37JMfETRLz4mIeX3knsqZV3tJ-0jl4';
    this.header = new Headers({'Authorization': 'Bearer ' + token});
  }

  builder (resource: string) {
    this.url = 'http://localhost:8000/api/' + resource;
    return this;
  }

  list (options: Options = {}) {
    let url = this.url;

    if (options.limit === undefined) {
      options.limit = 20;
    }

    url += '?limit=' + options.limit;

    return this.http.get(url, {headers: this.header})
      .toPromise()
      .then((res) => {
        return res.json() || {};
      });
  }

  view (id: number) {
    return this.http.get(this.url + '/' + id, {headers: this.header})
      .toPromise()
      .then((res) => {
        return res.json() || {};
      });
  }

  update (id: number, data: Object) {
    return this.http.put(this.url + '/' + id, data, {headers: this.header})
      .toPromise()
      .then((res) => {
        return res.json() || {};
      });
  }

  insert (data: Object) {
    return this.http.post(this.url, data, {headers: this.header})
      .toPromise()
      .then((res) => {
        return res.json() || {};
      });
  }

  delete (id: number) {
    return this.http.delete(this.url + '/' + id, {headers: this.header})
      .toPromise()
      .then((res) => {
        return res.json() || {};
      });
  }
}

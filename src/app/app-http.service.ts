import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

interface Options {
    limit?:number;
    page?:number;
}

interface RequestOptions {
  headers?:any;
}

@Injectable()
export class AppHttpService {
  private url: string;
  private options: RequestOptions = {};

  constructor (private http: Http) {} 

  setAccessToken (token: string) {
    /*let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImI3YTMwZGQ3ZGY0MmEzYTRjOTJlNmFjMGMzZWU2YzFiMzJjNzMyMDQ4NjBlZDY2Y2YxYjBlMTdlNDIxNGJjZDZjN2Q0Mzc2Y2FiOWJlZjgwIn0.eyJhdWQiOiI0IiwianRpIjoiYjdhMzBkZDdkZjQyYTNhNGM5MmU2YWMwYzNlZTZjMWIzMmM3MzIwNDg2MGVkNjZjZjFiMGUxN2U0MjE0YmNkNmM3ZDQzNzZjYWI5YmVmODAiLCJpYXQiOjE0ODU1Mzg3MjcsIm5iZiI6MTQ4NTUzODcyNywiZXhwIjoxNDg1NTQyMzI2LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.d9Pmz5QxThgeuwYKbyho-IVCm45l22M-QITl6UuBR2jRnLMv0miM5UR7jOEedb58Ys_dPMugSpjcDOOjx64lnOaFeNUBYM2JCijULmHBZzEZSS3wz8ifK1hv4nJEcgxHqBb7y3ggNwbGsqGTH8BZt5Qd-Q8X4qu887Lav2-YEFyw6GhWcmvq-oH_k67YwftudfkPzue6jxjBPZG6wjfKk_fBpP5dcHWwgsEqfshkuSF0fnX4OT---0Mxz6w661QFNFgqqTb4T-HjJzBQuqeFaxYEMdtCPzZ3GFmzBXrX6bGQ9NvP9ofP3FSXLTyKYOqGQN2urP7Rt2Fy70DUotEAWq584zLgAuOhI6nYjHundGJHFzUlEA78CkkoyMjpztnkfNZi6jlDAxbsGjPR3gA9ied33wlOEmmYwa6cg4Sqyhl3bxf6Jlqw_t6sglL254wzWaQwAsoYjIDUorUK-A0dRXoo81rzjDrQClOE546YfWllJC2d0JcXph1IDjNOMVWFb0D5NM450T-FLiPqyK5-MWFj09cYhzkqJKQRfZe3_v40Vgzc8e0-az7lO7ex23eVQuRkATTvDNg5pwA8C2yaUmi2YkvAdxKP7SsD_1b5eQ352H76meO9r7xLEF2gbjwik9iQ1pGEb-cyWS1cKMouZVkleobj1ZsEB_GVDDrAWmA';*/

    let header = new Headers({'Authorization': 'Bearer ' + token});
    this.options.headers = header;
  }

  client(url: string) {
    this.url = 'http://localhost:8000/' + url;
    return this;
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

    if (options.page === undefined) {
      options.page = 1;
    }

    url += '?limit=' + options.limit;
    url += '&page=' + options.page;

    return this.http.get(url, this.options)
      .toPromise()
      .then((res) => {
        return res.json() || {};
      });
  }

  view (id: number) {
    return this.http.get(this.url + '/' + id, this.options)
      .toPromise()
      .then((res) => {
        return res.json() || {};
      });
  }

  update (id: number, data: Object) {
    return this.http.put(this.url + '/' + id, data, this.options)
      .toPromise()
      .then((res) => {
        return res.json() || {};
      });
  }

  insert (data: Object) {
    return this.http.post(this.url, data, this.options)
      .toPromise()
      .then((res) => {
        return res.json() || {};
      });
  }

  delete (id: number) {
    return this.http.delete(this.url + '/' + id, this.options)
      .toPromise()
      .then((res) => {
        return res.json() || {};
      });
  }
  
  search (term: string) {
    return this.http.get(this.url + '/?like=title,' + term, this.options)
      .toPromise()
      .then((res) => {
        return res.json() || {};
      });
  }
}

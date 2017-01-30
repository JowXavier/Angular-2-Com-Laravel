import {Injectable } from '@angular/core';
import { Request, Response, XHRBackend, RequestOptions, RequestOptionsArgs, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationHttpService extends Http {
	constructor (
		backend: XHRBackend,
		defaultOptions: RequestOptions,
		private router: Router
	) {
		super(backend, defaultOptions)

		if(localStorage['tokens'] == '') {
			this.router.navigate(['/login']);
		}

		let token = localStorage['tokens'] ? JSON.parse(localStorage['tokens']) : {};
		if (token.access_token) {
			this.setAccessToken(token.access_token);
		}
	}

	request(url: string | Request, options:RequestOptionsArgs) : Observable<Response> {
		return super.request(url, options).catch((error: Response) => {
			if (error.status === 401 || error.status === 0) {
				this.refreshToken()
				.then((response) => {
					if (response) {
						let token = localStorage['tokens'] ? JSON.parse(localStorage['tokens']) : {};
						if (token.access_token) {
							this.setAccessToken(token.access_token);
							alert('Login atualizado, refaça o último passo');
						}
					} else {
						this.router.navigate(['/login']);
					}
				});
			}
			return Observable.throw(error);
		});
	}

	protected setAccessToken(token: string) {
		let header = new Headers({'Authorization': 'Bearer ' + token});
		this._defaultOptions.headers = header;
	}

	protected refreshToken() {
		let token = localStorage['tokens'] ? JSON.parse(localStorage['tokens']) : {};
		if (token.refresh_token) {
			let auth = {
				grant_type: 'refresh_token',
				client_id: '2',
				client_secret: 'SeDF5QLosE1cskxB9ifvhZ4MGnqOKuMjYxkYhEsQ',
				refresh_token: token.refresh_token,
				scope: '',
			}

			return this.post('http://localhost:8000/oauth/token', auth)
			.toPromise()
			.then((res) => {
					let result = res.json() || {};
					localStorage['tokens'] = JSON.stringify(result);
					return result.refresh_token !== undefined;
				});
		}
		return new Promise((resolve, reject) => {
			return resolve(false);
		});
	}
}

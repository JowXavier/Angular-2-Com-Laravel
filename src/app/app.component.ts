import { Component } from '@angular/core';
import { Router } from '@angular/router';
import '../../public/css/styles.css';
import 'materialize-css/dist/css/materialize.min.css';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent { 
	constructor (
		private router: Router
	) {}
	
	public logout() {
		localStorage['tokens'] = '';
		this.router.navigate(['/login']);
	}	
}

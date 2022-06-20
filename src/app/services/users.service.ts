import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";

@Injectable({
	providedIn: "root"
})
export class UsersService {
	constructor(private http: HttpClient, private cookies: CookieService){}

	login(user: any): Observable<any> {
		return this.http.post(
			'http://127.0.0.1:5000/api/auth/login', user)
	}

	register(user: any): Observable<any> {
		return this.http.post(
			'http://127.0.0.1:5000/api/auth/register', user
		)
	}

	setToken(token: string, authenticated: string) {
		this.cookies.set("token", token)
		this.cookies.set("isAuthenticated", authenticated)
	}

	getToken() {
		return this.cookies.get("token")
	}

	getUser(id:number): Observable<any> {
		return this.http.get(
			`http://127.0.0.1:5000/api/users/${id}`
		)
	}

}
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class NewsService {
	constructor(private http: HttpClient){}

	getNews(): Observable<any> {
		return this.http
		  .get('http://127.0.0.1:5000/api/news')
	}
}
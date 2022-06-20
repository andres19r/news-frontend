import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class NewsService {
	baseUrl = 'http://127.0.0.1:5000/api/news/'

	constructor(private http: HttpClient){}

	getNews(): Observable<any> {
		return this.http.get(this.baseUrl)
	}

	postImage(file: any, token: string): Observable<any> {
		const header = new HttpHeaders().set(
			"Authorization",
			`Bearer ${token}`
		)
		const formData = new FormData()
		formData.append('file', file)
		return this.http.post(this.baseUrl, formData, {headers: header})
	}
	
	getNewsItem(id: number): Observable<any> {
		return this.http.get(`${this.baseUrl}${id}`)
	}
}
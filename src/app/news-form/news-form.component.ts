import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.css'],
})
export class NewsFormComponent implements OnInit {
  file?: File;

  constructor(
    private cookies: CookieService,
    private newsService: NewsService
  ) {}

  ngOnInit(): void {}

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  onUpload() {
    const token = this.cookies.get('token');
    this.newsService
      .postImage(this.file, token)
      .subscribe((res) => console.log(res));
  }
}

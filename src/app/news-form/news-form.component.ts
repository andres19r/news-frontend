import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NewsService } from '../services/news.service';
import { mergeMap, map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.css'],
})
export class NewsFormComponent implements OnInit {
  file?: File;
  id: number = 0

  constructor(
    private cookies: CookieService,
    private newsService: NewsService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  onUpload(headline: string, text: string) {
    const token = this.cookies.get('token');
    this.newsService.postImage(this.file, token).pipe(
      map(res => this.id = res),
      mergeMap(() => this.newsService.putNewsItem(this.id, token ,headline, text))
    ).subscribe(() => this.router.navigateByUrl('news'))
  }
}

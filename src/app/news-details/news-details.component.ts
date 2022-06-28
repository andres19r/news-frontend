import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../services/news.service';
import { Location } from '@angular/common';
import {
  takeUntil,
  Subject,
  materialize,
  dematerialize,
  tap,
  delay,
} from 'rxjs';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css'],
})
export class NewsDetailsComponent implements OnInit, OnDestroy {
  news: any | undefined;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private location: Location
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const newsIdFromRoute = Number(routeParams.get('newsId'));
    this.getNewsItem(newsIdFromRoute);
  }

  getNewsItem(id: number): void {
    this.newsService
      .getNewsItem(id)
      .pipe(
        materialize(),
        delay(500),
        tap((n) => console.log(n)),
        dematerialize(),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (data) => (this.news = data.news_item),
        error: (error) => console.log(error),
      });
  }

  goBack(): void {
    this.location.back();
  }
}

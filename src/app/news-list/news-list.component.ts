import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewsService } from '../services/news.service';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';
import {
  takeUntil,
  Subject,
  dematerialize,
  materialize,
  delay,
  tap,
  catchError,
  of
} from 'rxjs';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
})
export class NewsListComponent implements OnInit, OnDestroy {
  newsList: any[] = [];
  showForm: boolean = false;
  buttonLabel: string = '';
  user!: User;
  userId: number = 0;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    const loggedUser = localStorage.getItem('user');
    this.user = JSON.parse(loggedUser || '{}');

    const routeParams = this.route.snapshot.paramMap;
    const userIdFromRoute = Number(routeParams.get('userId'));
    this.userId = userIdFromRoute;
    if (userIdFromRoute === 0) {
      this.getNewsList();
    } else {
      this.getUserNews();
    }
  }

  getNewsList(): void {
    this.newsService
      .getNews()
      .pipe(
        materialize(),
        delay(500),
        tap((n) => console.log(n)),
        dematerialize(),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (data) => (this.newsList = data.news),
        error: (error) => console.log(error),
      });
  }

  getUserNews(): void {
    this.newsService
      .getNewsByUser(this.userId)
      .pipe(
        materialize(),
        delay(500),
        tap((n) => console.log(n)),
        dematerialize(),
        takeUntil(this.destroy$),
        catchError(err => of([]))
      )
      .subscribe({
        next: (data) => (this.newsList = data.news),
        error: (error) => console.log(error),
      });
  }
}

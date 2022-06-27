import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewsService } from '../services/news.service';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, Subject } from 'rxjs';

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
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
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

  getNewsList() {
    this.newsService
      .getNews()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.newsList = data.news;
      });
  }

  getUserNews() {
    this.newsService
      .getNewsByUser(this.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.newsList = data.news;
      });
  }
}

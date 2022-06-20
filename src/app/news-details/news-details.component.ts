import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../services/news.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css'],
})
export class NewsDetailsComponent implements OnInit {
  news: any | undefined;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const newsIdFromRoute = Number(routeParams.get('newsId'));
    this.getNewsItem(newsIdFromRoute)
  }

  getNewsItem(id: number): void {
    this.newsService.getNewsItem(id).subscribe(data => {
      this.news = data.news_item
    })
  }

  goBack(): void {
    this.location.back()
  }
}

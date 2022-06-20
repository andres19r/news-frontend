import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../user';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  newsList: any[] = []
  showForm: boolean = false
  buttonLabel: string = ''
  user!: User

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.getNewsList()
    const loggedUser = localStorage.getItem('user')
    this.user = JSON.parse(loggedUser || '{}')
    
  }

  getNewsList() {
    this.newsService.getNews().subscribe(data => {
      this.newsList = data.news
    })
  }

  getDetails(news: any) {
    console.log(news.id)
  }
}

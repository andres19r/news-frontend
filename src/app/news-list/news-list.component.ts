import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news/news.service';
import { Router } from '@angular/router';
import { UsersService } from '../users/users.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  newsList: any[] = []
  showForm: boolean = false
  buttonLabel: string = ''

  constructor(private newsService: NewsService,
    private cookies: CookieService,
    private router: Router) { }

  ngOnInit(): void {
    this.getNewsList()
  }

  getNewsList() {
    this.newsService.getNews().subscribe(data => {
      this.newsList = data.news
      console.log(this.newsList)
    })
  }

  createNews() {
     console.log('new list');
  }

  logout() {
    this.cookies.delete("token")
    this.cookies.set("isAuthenticated", 'false')
    this.router.navigateByUrl('login')
  }
}

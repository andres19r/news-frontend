import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';

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
  userId: number = 0

  constructor(private newsService: NewsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const loggedUser = localStorage.getItem('user')
    this.user = JSON.parse(loggedUser || '{}')

    const routeParams = this.route.snapshot.paramMap;
    const userIdFromRoute = Number(routeParams.get('userId'));
    this.userId = userIdFromRoute
    if (userIdFromRoute === 0) {
     this.getNewsList() 
    } else {
      this.getUserNews()
    }
  }

  getNewsList() {
    this.newsService.getNews().subscribe(data => {
      this.newsList = data.news
    })
  }

  getUserNews() {
    this.newsService.getNewsByUser(this.userId).subscribe(data => {
      this.newsList = data.news
    })
  }
}

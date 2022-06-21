import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataSharingService } from '../services/data-sharing.service';
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(
    private cookies: CookieService,
    private router: Router,
    private dataSharingService: DataSharingService
  ) {
    this.dataSharingService.isUserLoggedIn.subscribe( value => {
      this.isAuthenticated = value
    })
  }

  ngOnInit(): void {
    if(this.cookies.get('isAuthenticated') === 'true') {
      this.isAuthenticated = true
    }
  }

  logout() {
    this.cookies.delete('token');
    this.cookies.set('isAuthenticated', 'false');
    localStorage.removeItem('user');
    this.dataSharingService.isUserLoggedIn.next(false)
    this.router.navigateByUrl('login');
  }
}

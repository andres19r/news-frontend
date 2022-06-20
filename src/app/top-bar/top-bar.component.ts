import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(private cookies: CookieService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.cookies.delete("token")
    this.cookies.set("isAuthenticated", 'false')
    localStorage.removeItem('user')
    this.router.navigateByUrl('login')
  }
}

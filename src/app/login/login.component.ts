import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = ''
  password: string = ''

  constructor(private userService: UsersService,
     private router: Router,
     private cookies: CookieService) { }

  ngOnInit(): void {
  }

  login() {
    const user = {username: this.username, password: this.password}
    this.userService.login(user).subscribe( data => {
      this.userService.setToken(data.access_token, 'true')
      this.router.navigateByUrl('news')
      localStorage.setItem('user', JSON.stringify(data.user))
    })
  }
}

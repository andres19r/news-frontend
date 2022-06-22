import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { DataSharingService } from '../services/data-sharing.service';
import { UserLog } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private userService: UsersService,
    private router: Router,
    private dataSharingService: DataSharingService
  ) {}

  ngOnInit(): void {}

  login() {
    const user = new UserLog(this.username, this.password);
    this.userService.login(user).subscribe((data) => {
      this.userService.setToken(data.access_token, 'true');
      localStorage.setItem('user', JSON.stringify(data.user.user));
      this.dataSharingService.isUserLoggedIn.next(true);
      this.router.navigateByUrl('news');
    });
  }
}

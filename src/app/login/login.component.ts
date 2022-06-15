import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = ''
  password: string = ''

  constructor(public userService: UsersService) { }

  ngOnInit(): void {
  }

  login() {
    const user = {username: this.username, password: this.password}
    this.userService.login(user).subscribe( data => {
      console.log(data)
    })
    this.username = ''
    this.password = ''
  }
}

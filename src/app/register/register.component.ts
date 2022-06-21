import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { mergeMap, map } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: string = ''
  email: string = ''
  password: string = ''
  confirmPassword: string = ''

  constructor(public userService: UsersService, public router: Router) { }

  ngOnInit(): void {
  }

  register() {
    const user = {
      username: this.username,
      email: this.email,
      password: this.password
    }
    const userLogged = {username: this.username, password: this.password}
    if (this.password === this.confirmPassword && this.password !== '' && this.confirmPassword !== ''){
      this.userService.register(user).pipe(
        mergeMap(data => this.userService.login(userLogged)),
        map(data => this.userService.setToken(data.access_token, 'true'))
      ).subscribe(() => this.router.navigateByUrl('news'))
    }
  }

}

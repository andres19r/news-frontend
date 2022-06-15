import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users/users.service';

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

  constructor(public userService: UsersService) { }

  ngOnInit(): void {
  }

  register() {
    const user = {
      username: this.username,
      email: this.email,
      password: this.password
    }
    if (this.password === this.confirmPassword){
      this.userService.register(user).subscribe(data => {
        console.log(data)
      })
    }
  }

}

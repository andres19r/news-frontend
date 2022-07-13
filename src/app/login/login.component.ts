import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { DataSharingService } from '../services/data-sharing.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  })
  // username: string = '';
  // password: string = '';

  constructor(
    private userService: UsersService,
    private router: Router,
    private dataSharingService: DataSharingService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  login() {
    this.userService.login(this.loginForm.value).subscribe((data) => {
      this.userService.setToken(data.access_token, 'true');
      localStorage.setItem('user', JSON.stringify(data.user.user));
      this.dataSharingService.isUserLoggedIn.next(true);
      this.router.navigateByUrl('news');
    });
  }
}

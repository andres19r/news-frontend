import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { DataSharingService } from '../services/data-sharing.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, mergeMap } from 'rxjs';
import { UserRegister } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    public userService: UsersService,
    public router: Router,
    private dataSharingService: DataSharingService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  register() {
    const userRegister: UserRegister = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };
    const userLog = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
    };
    if (this.registerForm.valid) {
      this.userService
        .register(userRegister)
        .pipe(
          mergeMap((_) => this.userService.login(userLog)),
          map((data) => this.userService.setToken(data.access_token, 'true'))
        )
        .subscribe(() => {
          this.dataSharingService.isUserLoggedIn.next(true);
          this.router.navigateByUrl('news');
        });
    }
  }
}

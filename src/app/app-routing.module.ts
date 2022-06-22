import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NewsListComponent } from './news-list/news-list.component';
import {IsAuthenticatedGuard} from './guards/is-authenticated.guard';
import { NewsFormComponent } from './news-form/news-form.component';
import { NewsDetailsComponent } from './news-details/news-details.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'news', component: NewsListComponent, canActivate: [IsAuthenticatedGuard]},
  { path: 'create', component: NewsFormComponent, canActivate: [IsAuthenticatedGuard]},
  { path: 'news/:newsId', component: NewsDetailsComponent, canActivate: [IsAuthenticatedGuard]},
  { path: 'news/user/:userId', component: NewsListComponent, canActivate: [IsAuthenticatedGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

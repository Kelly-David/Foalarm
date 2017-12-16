/*
 * @Author: David Kelly
 * @Date: 2017-10-26 14:58:28
 * @Last Modified time: 2017-10-26 14:58:28
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/auth.guard';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { LoginComponent } from '../login/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full',  redirectTo: 'home' },
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

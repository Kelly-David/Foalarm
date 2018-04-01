/*
 * @Author: David Kelly
 * @Date: 2017-10-26 14:58:28
 * @Last Modified time: 2017-10-26 14:58:28
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/auth.guard';
import { LoginComponent } from '../login/login.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { RegisterComponent } from '../register/register.component';
import { ProfileComponent } from '../profile/profile.component';
import { HorseEditComponent } from '../horse/horse-edit/horse-edit.component';
import { HorseListComponent } from '../horse/horse-list/horse-list.component';
import { AlarmListComponent } from '../alarm/alarm-list/alarm-list.component';
import { AlarmEditComponent } from '../alarm/alarm-edit/alarm-edit.component';
import { AlertEditComponent } from '../alerts/alert-edit/alert-edit.component';
import { CameraListComponent } from '../cams/camera-list/camera-list.component';
import { DataGraphComponent } from '../data/data-graph/data-graph.component';
import { DataComponent } from '../data/data/data.component';
import { UserListComponent } from '../user-profile/user-list/user-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full',  redirectTo: 'profile' },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'profile', component: ProfileComponent,
  children: [
    { path: '', pathMatch: 'full', redirectTo: 'horse-list' },
    { path: 'horse-list', component: HorseListComponent, canActivate: [AuthGuard] },
    { path: 'horse-edit/:id', component: HorseEditComponent, canActivate: [AuthGuard] },
    { path: 'alarm-list', component: AlarmListComponent, canActivate: [AuthGuard] },
    { path: 'alarm-edit/:id', component: AlarmEditComponent, canActivate: [AuthGuard] },
    { path: 'alert-edit', component: AlertEditComponent, canActivate: [AuthGuard] },
    { path: 'camera-list', component: CameraListComponent, canActivate: [AuthGuard] },
    { path: 'data', component: DataComponent, canActivate: [AuthGuard]},
    { path: 'data/:id', component: DataGraphComponent, canActivate: [AuthGuard] },
    { path: 'user-list', component: UserListComponent, canActivate: [AuthGuard] },
    { path: 'user-list/:all', component: UserListComponent, canActivate: [AuthGuard] },
    { path: 'user-list/:friends', component: UserListComponent, canActivate: [AuthGuard] }
  ],
  canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'profile'}, // Fallback route (TODO page not found component)
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CompanyListComponent } from '../company/company-list/company-list.component';
import { CompanyEditComponent } from '../company/company-edit/company-edit.component';
import { ContactListComponent } from '../contact/contact-list/contact-list.component';
import { ContactEditComponent } from '../contact/contact-edit/contact-edit.component';
import { HomeComponent } from '../home/home.component';
import { AuthGuard } from '../auth/auth.guard';
import { LoginPageComponent } from '../login-page/login-page.component';
import { RegistrationComponent } from '../registration/registration.component';
import { LoginComponent } from '../admin/login/login.component';
import { UserEditComponent } from '../admin/user-edit/user-edit.component';
import { UserListComponent } from '../admin/user-list/user-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full',  redirectTo: 'home' },
  { path: 'login', component: LoginPageComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'admin', component: LoginComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'company-list', component: CompanyListComponent, canActivate: [AuthGuard] },
  { path: 'company-edit/:id', component: CompanyEditComponent, canActivate: [AuthGuard]  }, // optional parameter in the url
  { path: 'contact-list', component: ContactListComponent, canActivate: [AuthGuard]  },
  { path: 'contact-edit/:id', component: ContactEditComponent, canActivate: [AuthGuard]  },
  { path: 'user-list', component: UserListComponent, canActivate: [AuthGuard]  },
  { path: 'user-edit/:id', component: UserEditComponent, canActivate: [AuthGuard]  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

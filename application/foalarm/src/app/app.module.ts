import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthService } from './core/auth.service';
import { AuthGuard } from './core/auth.guard';
import { User } from './user';
import { Alert } from './alert';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginComponent } from './login/login.component';
import { AlertHandlerService } from './alert-handler.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { UtilityComponent } from './utility/utility.component';
import { HorseListComponent } from './horse/horse-list/horse-list.component';
import { HorseService } from './horse/horse.service';
import { HorseEditComponent } from './horse/horse-edit/horse-edit.component';
import { FirestoreService } from './firestore.service';
import { ActiveHorseComponent } from './horse/active-horse/active-horse.component';
import { AlarmListComponent } from './alarm/alarm-list/alarm-list.component';
import { AlarmService } from './alarm/alarm.service';
import { ActiveAlarmListComponent } from './alarm/active-alarm-list/active-alarm-list.component';
import { AlarmEditComponent } from './alarm/alarm-edit/alarm-edit.component';
import { AlarmSelectComponent } from './alarm/alarm-select/alarm-select.component';
import { SelectModule } from 'ng2-select';
import { AlertListComponent } from './alerts/alert-list/alert-list.component';
import { AlertsService } from './alerts/alerts.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { NavListComponent } from './nav/nav-list/nav-list.component';
import { SlicePipe } from '@angular/common';
import { AlertEditComponent } from './alerts/alert-edit/alert-edit.component';
import { CameraListComponent } from './cams/camera-list/camera-list.component';
import { CameraViewComponent } from './cams/camera-view/camera-view.component';
import { FilterPipe, FilterDatePipe, AlertPipe, FilterUserPipe } from './pipes/alert.pipe';
import { MessagingService } from './messaging.service';
import { DataGraphComponent } from './data/data-graph/data-graph.component';
import { DataService } from './data/data.service';
import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CalcComponent } from './tools/calc/calc.component';
import { GenerateReportComponent } from './data/generate-report/generate-report.component';
import { ReportLinkComponent } from './data/report-link/report-link.component';
import { ReportService } from './data/report.service';
import { DataComponent } from './data/data/data.component';
import { AlarmLinkComponent } from './data/alarm-link/alarm-link.component';
import { HorseLinkComponent } from './data/horse-link/horse-link.component';
import { AlarmIdListComponent } from './alarm/alarm-id-list/alarm-id-list.component';
import { AlarmEditModalComponent } from './alarm/alarm-edit-modal/alarm-edit-modal.component';
import { ModalModule, CollapseModule, TooltipModule } from 'ngx-bootstrap';
import { AlarmEditFormComponent } from './alarm/alarm-edit-form/alarm-edit-form.component';
import { HorseEditFormComponent } from './horse/horse-edit-form/horse-edit-form.component';
import { ModalComponent } from './modal/modal.component';
import { PublicHorseListComponent } from './public/public-horse-list/public-horse-list.component';
import { PublicService } from './public/public.service';
import { PublicHorseComponent } from './public/public-horse/public-horse.component';
import { UserService } from './user-profile/user.service';
import { HorseOwnerComponent } from './user-profile/horse-owner/horse-owner.component';
import { UserListComponent } from './user-profile/user-list/user-list.component';
import { UserComponent } from './user-profile/user/user.component';
import { FriendComponent } from './user-profile/friend/friend.component';
import { PublicUserComponent } from './user-profile/public-user/public-user.component';
import { PublicFriendsHorseListComponent } from './public/public-friends-horse-list/public-friends-horse-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserProfileComponent,
    RegisterComponent,
    ProfileComponent,
    UtilityComponent,
    HorseListComponent,
    HorseEditComponent,
    ActiveHorseComponent,
    AlarmListComponent,
    ActiveAlarmListComponent,
    AlarmEditComponent,
    AlarmSelectComponent,
    AlertListComponent,
    NavListComponent,
    AlertEditComponent,
    CameraListComponent,
    CameraViewComponent,
    FilterPipe, FilterDatePipe, AlertPipe, FilterUserPipe, DataGraphComponent, CalcComponent, GenerateReportComponent,
    ReportLinkComponent, DataComponent, AlarmLinkComponent, HorseLinkComponent, AlarmIdListComponent,
    AlarmEditModalComponent, AlarmEditFormComponent, HorseEditFormComponent, ModalComponent, PublicHorseListComponent,
    PublicHorseComponent, HorseOwnerComponent, UserListComponent, UserComponent, FriendComponent, PublicUserComponent, PublicFriendsHorseListComponent,
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, AngularFireDatabaseModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, CoreModule, AppRoutingModule, // imports firebase/auth, only needed for auth features
    SelectModule,
    NgxChartsModule,
    ModalModule.forRoot(), CollapseModule.forRoot(), TooltipModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard,
    AlertHandlerService,
    HorseService,
    FirestoreService,
    AlarmService,
    AlertsService,
    MessagingService,
    DataService,
    SlicePipe,
    ReportService,
    PublicService,
    UserService,
  ],
  entryComponents: [
    AlarmEditModalComponent,
    ModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

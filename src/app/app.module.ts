import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxMasonryModule } from 'ngx-masonry';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppHeaderMobileComponent } from './app-header-mobile/app-header-mobile.component';
import { MatToolbarModule, MatButtonModule,
  MatSidenavModule, MatIconModule, MatListModule, MatCardModule,
  MatTabsModule, MatInputModule, MatProgressSpinnerModule, MatDialogModule } from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { from } from 'rxjs';
import { CategoriesComponent } from './app-header-mobile/categories/categories.component';
import { CustomAutoFocusDirective } from './custom-auto-focus.directive';
import { BottomNavComponent } from './app-header-mobile/bottom-nav/bottom-nav.component';
import { DesktopComponent } from './desktop/desktop.component';
import { HomeComponent } from './desktop/home/home.component';
import { LoginComponent } from './desktop/login/login.component';
import { EmailLoginComponent } from './desktop/login/email-login/email-login.component';
import { LoginMobileComponent } from './app-header-mobile/login-mobile/login-mobile.component';
import { EmailLoginMobileComponent } from './app-header-mobile/login-mobile/email-login-mobile/email-login-mobile.component';
import { UserProfileComponent } from './desktop/user-profile/user-profile.component';
import { UserInfoComponent } from './desktop/user-profile/user-info/user-info.component';
import { HomeMobileComponent } from './app-header-mobile/home-mobile/home-mobile.component';
import { HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';

import { UserProfileMobileComponent } from './app-header-mobile/user-profile-mobile/user-profile-mobile.component';
import { UserCredentialsComponent } from './app-header-mobile/user-profile-mobile/user-info/user-credentials/user-credentials.component';
import { UserInformationComponent } from './app-header-mobile/user-profile-mobile/user-info/user-information/user-information.component';
import { EditProfileComponent } from './desktop/user-profile/edit-profile/edit-profile.component';
import { AuthInterceptor } from './auth-interceptor';
import { ErrorHTTPInterceptor } from './error-interceptor';
import { UserEditMobileComponent } from './app-header-mobile/user-profile-mobile/user-edit-mobile/user-edit-mobile.component';
import {SocialLoginModule, AuthServiceConfig, GoogleLoginProvider} from 'angularx-social-login';
import { getAuthServiceConfigs } from './socialLoginConfig';
import { CreateComponent, ErrorDialogComponent, DeleteConfirmComponent } from './create/create.component';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { SliderModule } from 'angular-image-slider';
import { MainOneComponent } from './desktop/home/main-one/main-one.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TruncatePipe } from './pipes/truncate';
import { SafeHtmlPipe } from './pipes/sanitize';
import { BlogComponent } from './desktop/blog/blog.component';
import { BlogMobileComponent } from './app-header-mobile/blog-mobile/blog-mobile.component';
import { FeedComponent } from './feed/feed.component';
import { FeedMobileComponent } from './feed/feed-mobile/feed-mobile.component';
import { SectionMenuComponent } from './desktop/section-menu/section-menu.component';
import { SectionMenuMobileComponent } from './app-header-mobile/section-menu-mobile/section-menu-mobile.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { FollowerListComponent } from './desktop/user-profile/follower-list/follower-list.component';
import { FollowingListComponent } from './desktop/user-profile/following-list/following-list.component';
import { NotificationComponent } from './app-header-mobile/notification/notification.component';
import { CategoryComponent  } from './desktop/category/category.component';
import { ExploreComponent } from './desktop/explore/explore.component';
import { NgMasonryGridModule } from 'ng-masonry-grid';
import { ExploreMobileComponent } from './app-header-mobile/explore-mobile/explore-mobile.component';
import { CategoryMobileComponent } from './app-header-mobile/category-mobile/category-mobile.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SearchComponent } from './search/search.component';
import { MessageComponent } from './email-verification/message/message.component';
import { ConfirmComponent } from './email-verification/confirm/confirm.component';
import { DraftComponent } from './create/draft/draft.component';
import { TermsComponent } from './desktop/login/terms/terms.component';
import { TermsMobileComponent } from './app-header-mobile/login-mobile/terms-mobile/terms-mobile.component';
import { ForgotPasswordComponent } from './desktop/login/email-login/forgot-password/forgot-password.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AppHeaderMobileComponent,
    CategoriesComponent,
    CustomAutoFocusDirective,
    BottomNavComponent,
    DesktopComponent,
    HomeComponent,
    LoginComponent,
    EmailLoginComponent,
    LoginMobileComponent,
    EmailLoginMobileComponent,
    UserProfileComponent,
    HomeMobileComponent,
    UserInfoComponent,
    UserProfileComponent,
    UserProfileMobileComponent,
    UserCredentialsComponent,
    UserInformationComponent,
    EditProfileComponent,
    UserEditMobileComponent,
    CreateComponent,
    MainOneComponent,
    TruncatePipe,
    SafeHtmlPipe,
    BlogComponent,
    BlogMobileComponent,
    FeedComponent,
    FeedMobileComponent,
    SectionMenuComponent,
    SectionMenuMobileComponent,
    SplashScreenComponent,
    FollowerListComponent,
    FollowingListComponent,
    NotificationComponent,
    CategoryComponent,
    ExploreComponent,
    ExploreMobileComponent,
    CategoryMobileComponent,
    SearchComponent,
    MessageComponent,
    ConfirmComponent,
    ErrorDialogComponent,
    DraftComponent,
    DeleteConfirmComponent,
    TermsComponent,
    TermsMobileComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    FormsModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatRadioModule,
    HttpClientModule,
    SocialLoginModule,
    RichTextEditorAllModule,
    SliderModule,
    NgbModule,
    NgxMasonryModule,
    NgMasonryGridModule,
    InfiniteScrollModule,
    NgxSkeletonLoaderModule
  ],
  entryComponents: [ErrorDialogComponent, DeleteConfirmComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHTTPInterceptor, multi: true },
  {provide: AuthServiceConfig, useFactory: getAuthServiceConfigs}],
  bootstrap: [AppComponent]
})
export class AppModule { }

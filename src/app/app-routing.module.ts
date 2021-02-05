import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './desktop/login/login.component';
import { HomeComponent } from './desktop/home/home.component';
import { EmailLoginComponent } from './desktop/login/email-login/email-login.component';
import { LoginMobileComponent } from './app-header-mobile/login-mobile/login-mobile.component';
import { EmailLoginMobileComponent } from './app-header-mobile/login-mobile/email-login-mobile/email-login-mobile.component';
import { UserProfileComponent } from './desktop/user-profile/user-profile.component';
import { UserInfoComponent } from './desktop/user-profile/user-info/user-info.component';
import { CategoriesComponent } from './app-header-mobile/categories/categories.component';
import { UserProfileMobileComponent } from './app-header-mobile/user-profile-mobile/user-profile-mobile.component';
import { UserCredentialsComponent } from './app-header-mobile/user-profile-mobile/user-info/user-credentials/user-credentials.component';
import { UserInformationComponent } from './app-header-mobile/user-profile-mobile/user-info/user-information/user-information.component';
import { EditProfileComponent } from './desktop/user-profile/edit-profile/edit-profile.component';
import { UserEditMobileComponent } from './app-header-mobile/user-profile-mobile/user-edit-mobile/user-edit-mobile.component';
import { CreateComponent } from './create/create.component';
import { HomeMobileComponent } from './app-header-mobile/home-mobile/home-mobile.component';
import { BlogComponent } from './desktop/blog/blog.component';
import { BlogMobileComponent } from './app-header-mobile/blog-mobile/blog-mobile.component';
import { FeedComponent } from './feed/feed.component';
import { FeedMobileComponent } from './feed/feed-mobile/feed-mobile.component';
import { SectionMenuComponent } from './desktop/section-menu/section-menu.component';
import { SectionMenuMobileComponent } from './app-header-mobile/section-menu-mobile/section-menu-mobile.component';
import { APIResolver } from './blog.resolver';
import { FeedResolver } from './feed.resolver';
import { FollowerListComponent } from './desktop/user-profile/follower-list/follower-list.component';
import { FollowingListComponent } from './desktop/user-profile/following-list/following-list.component';
import { NotificationComponent } from './app-header-mobile/notification/notification.component';
import { CategoryComponent } from './desktop/category/category.component';
import { CategoryResolver } from './category.resolver';
import { ExploreComponent } from './desktop/explore/explore.component';
import { ExploreMobileComponent } from './app-header-mobile/explore-mobile/explore-mobile.component';
import { CategoryMobileComponent } from './app-header-mobile/category-mobile/category-mobile.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: HomeComponent},
  { path: 'user/:id', component: UserProfileComponent, children: [{ path: '', component: UserInfoComponent, outlet: 'userinfo' }, {path:'followers', component: FollowerListComponent, outlet: 'userinfo'}, {path:'following', component: FollowingListComponent, outlet: 'userinfo'}]},
  {path: 'login/email', component: EmailLoginComponent, pathMatch: 'full'},
  {path: 'mobile/login', component: LoginMobileComponent, pathMatch: 'full'},
  {path: 'mobile/login/email', component: EmailLoginMobileComponent, pathMatch: 'full'},
  {path: 'mobile/user', component: UserProfileMobileComponent, pathMatch: 'full'},
  {path: 'mobile/user/profile', component: UserCredentialsComponent,
  children: [{path: '', component: UserInformationComponent, outlet: 'userinformation'},{path:'followers', component: FollowerListComponent, outlet: 'userinformation'}, {path:'following', component: FollowingListComponent, outlet: 'userinformation'}] },
  {path: 'user/:id/edit', component: EditProfileComponent, pathMatch: 'full', children:
  [{path: '', component: UserInfoComponent, outlet: 'user-info'}]},
  {path: 'mobile/user/edit', component: UserEditMobileComponent, pathMatch: 'full'},
  {path: 'create', component: CreateComponent, pathMatch: 'full'},
  {path: 'mobile/home', component: HomeMobileComponent, pathMatch: 'full'},
  {path: 'blog', component: BlogComponent},
  {path: 'blog/:id', component: BlogComponent, resolve: {blog: APIResolver}},
  {path: 'mobile/blog', component: BlogMobileComponent},
  {path: 'mobile/blog/:id', component: BlogMobileComponent},
  {path: 'feed', component: FeedComponent, resolve: {blogs: FeedResolver}},
  {path: 'mobile/feed', component: FeedMobileComponent, resolve: {blogs: FeedResolver}},
  {path: 'section', component: SectionMenuComponent},
  { path: 'mobile/section', component: SectionMenuMobileComponent },
  { path: 'mobile/notification', component: NotificationComponent },
  { path: 'category/:name', component: CategoryComponent, resolve: { blogs: CategoryResolver } },
  { path: 'explore', component: ExploreComponent },
  { path: 'mobile/explore', component: ExploreMobileComponent },
  { path: 'mobile/category/:name', component: CategoryMobileComponent, resolve: { blogs: CategoryResolver } },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MembersListComponent } from './members/members-list/members-list.component';
import { MembersDetailComponent } from './members/members-detail/members-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import {ToastrModule} from "node_modules/ngx-toastr"

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MembersListComponent,
    MembersDetailComponent,
    MessagesComponent,
    ListsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ToastrModule.forRoot(
      {
        positionClass:"toast-bottom-right"
      }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MembersListComponent } from './members/members-list/members-list.component';
import { MembersDetailComponent } from './members/members-detail/members-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children:[  { path: "members", component: MembersListComponent ,canActivate:[AuthGuard]},
  { path: "members/:username", component: MembersDetailComponent },
  { path: "lists", component: ListsComponent },
  { path: "messages", component: MessagesComponent }]
  },
  { path: 'errors', component: TestErrorComponent },
  { path: 'not-found', component: NotFoundComponent },
 {path:'server-error',component:ServerErrorComponent},
  { path: "**", component: HomeComponent, pathMatch: "full" },
  
            
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

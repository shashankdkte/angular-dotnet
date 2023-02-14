import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private http: HttpClient,private accountService:AccountService) {
    
  }

  title = 'Dating Apps';
  users: any;

    ngOnInit(): void {
      this.getUsers();
      this.setCurrentUser();
    }
  
  getUsers() {
        this.http.get('https://localhost:7197/api/Users').subscribe({
        next: (response) => {
          this.users = response 
        },
        error: (err) => { 
          console.log(err)
        },
        complete: () => {
          console.log('Request completed')
        }
        
    })
  }
  setCurrentUser() {
    //get userstring
    const userString = localStorage.getItem("user")
    if (!userString)
    {
      return
    }
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);

  }
}

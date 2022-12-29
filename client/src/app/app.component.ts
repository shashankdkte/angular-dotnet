import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private http: HttpClient) {
    
  }

  title = 'Dating App';
  users: any;

    ngOnInit(): void {
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
}

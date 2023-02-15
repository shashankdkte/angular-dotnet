import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output() iscancelRegister = new EventEmitter<boolean>();
  constructor(private accountService:AccountService,private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  register() {
    this.accountService.register(this.model).subscribe({
      next: (response) => {
        console.log(response);
        this.cancel();
       },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error);
      }
  })
   }
  cancel() {
    let register = false
    this.iscancelRegister.emit(false);
  }
}

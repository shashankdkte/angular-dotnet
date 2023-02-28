import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output() iscancelRegister = new EventEmitter<boolean>();
  registerForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;
  constructor(private accountService:AccountService,private toastr:ToastrService,private fb:FormBuilder,
    private router:Router) { }

  initializeForm()
  {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['',Validators.required],
      knownAs: ['',Validators.required],
      dateOfBirth: ['',Validators.required],
      city: ['',Validators.required],
      country: ['',Validators.required],
      password: ['',[Validators.required,Validators.minLength(4)]],
      confirmPassword:['',[Validators.required,this.matchValues('password')]]
    })
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => {
        this.registerForm.controls['confirmPassword'].updateValueAndValidity();
      }
    })
  }
  matchValues(matchTo: string):ValidatorFn
  {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null: {noMatching:true}
    }
  }
  ngOnInit(): void {
    this.initializeForm();
  }
  register() {
    console.log(this.registerForm?.value);
    this.accountService.register(this.registerForm.value).subscribe({
      next: (response) => {
        console.log(response);
       this.router.navigateByUrl('/members')
       },
      error: (error) => {
        console.log(error);
       this.validationErrors = error
      }
  })
   }
  cancel() {
    let register = false
    this.iscancelRegister.emit(false);
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {
  members$: Observable<Member[]> | undefined
  members: Member[] = [];
  pagination: Pagination | undefined;
  userParams: UserParams | undefined;
  user: User | undefined;
  genderList = [{ value: 'male', display: 'Males' },
  {value:'female',display:'Females'}]
  constructor(private memberService: MemberService)
  {
   this.userParams = this.memberService.getUserParams()
   }

  ngOnInit(): void {
    //this.members$ = this.memberService.getMembers();
    this.loadMembers();
    console.log(this.members);
  }
  loadMembers()
  {
    if (!this.userParams) return;
    this.memberService.setUserParams(this.userParams)
    this.memberService.getMembers(this.userParams).subscribe({
      next: (response: any) => {
     
        if (response.result && response.pagination)
        {
          console.log(response);
          this.members = response.result;
          this.pagination = response.pagination;
          }
      }
    })
    
  }
  resetFilter()
  {
   
      this.userParams = this.memberService.resetUserParams()
      this.loadMembers();
    
  }

  pageChanged(event:any)
  {
    if (this.userParams && this.userParams.pageNumber != event.page)
    {
      this.userParams.pageNumber = event.page;
      this.memberService.setUserParams(this.userParams);
      this.loadMembers();
  }
  }
  


}

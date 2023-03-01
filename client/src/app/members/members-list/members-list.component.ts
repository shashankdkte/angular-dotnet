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
  user: User |undefined;
  constructor(private memberService: MemberService, private accountService: AccountService)
  {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user)
        {
          this.userParams = new UserParams(user);
          this.user = user;
          }
      }
    })
   }

  ngOnInit(): void {
    //this.members$ = this.memberService.getMembers();
    this.loadMembers();
    console.log(this.members);
  }
  loadMembers()
  {
    if (!this.userParams) return;
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

  pageChanged(event:any)
  {
    if (this.userParams && this.userParams.pageNumber != event.page)
    {
      this.userParams.pageNumber = event.page;
      this.loadMembers();
  }
  }
  


}

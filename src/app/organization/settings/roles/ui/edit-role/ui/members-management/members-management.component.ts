import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { Member } from '../../../../model/role';
import { ReactiveFormsModule } from '@angular/forms';
import { MembersService } from 'src/app/organization/service/members.service';

@Component({
  selector: 'app-members-management',
  standalone: true,
  imports: [],
  templateUrl: './members-management.component.html',
  styleUrl: './members-management.component.css',
})
export class MembersManagementComponent implements OnInit {
  @Input({ required: true }) members!: Member[];
  @Output() unassignMember = new EventEmitter<string>();
  @Output() assignMembers = new EventEmitter<string[]>();

  allMembers: Member[] = [];

  private membersService = inject(MembersService);

  ngOnInit(): void {
    this.membersService.getAllByOrganization('1').subscribe({
      next: (value) => {
        if (value.body) {
          this.allMembers = value.body.members as Member[];
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  assignMember(memberId: string)
  {
    this.assignMembers.emit([memberId])
  }

}

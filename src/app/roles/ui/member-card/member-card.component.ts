import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Member } from 'src/app/organization/components/organization-members/model/member';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './member-card.component.html'
})
export class MemberCardComponent {
  @Input({required: true}) member!: Member;
  @Output() remove = new EventEmitter<Member>();
}

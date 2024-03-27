import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Invitation } from 'src/app/invitations/model/invitation';

@Component({
  selector: 'app-invitation-card',
  standalone: true,
  imports: [],
  templateUrl: './invitation-card.component.html'
})
export class InvitationCardComponent {
 @Input({required: true}) invitation!: Invitation;
 @Output() accept = new EventEmitter<Invitation>();
 @Output() reject = new EventEmitter<Invitation>();

 acceptInvitation(invitation: Invitation)
 {
  this.accept.emit(invitation);
 }

 rejectInvitation(invitation: Invitation)
 {
  this.reject.emit(invitation);
 }
}

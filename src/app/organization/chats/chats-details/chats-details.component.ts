import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Chat, ChatMember, ChatMembers} from "../../model/chat";
import {Member} from "../../settings/roles/model/role";
import {NgForOf, NgIf} from "@angular/common";
import {ChatService} from "../../service/chat.service";
import {ChatMemberService} from "../../service/chat.member.service";
import {OrganizationService} from "../../service/organization.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-chats-details',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './chats-details.component.html',
  styleUrl: './chats-details.component.css'
})
export class ChatsDetailsComponent implements OnInit{
  @Input() organizationId?: string;
  @Input() selectedChat: Chat | null = null;
  @Output() memberInvited = new EventEmitter<string>();
  @Output() chatDeleted = new EventEmitter<void>();

  organizationMembers: Member[] = [];
  chatMembers: ChatMembers[] = [];
  filteredOrganizationMembers: Member[] = []

  detailView: 'details' | 'invitations' | 'members' = 'details';

  nickname: string = '';

  editingMemberId: string | null = null;


  constructor(
    private chatMemberService: ChatMemberService,
    private chatService: ChatService,
    private organizationService: OrganizationService
  ) {}

  ngOnInit(): void {
    this.loadOrganizationMembers();
  }

  loadOrganizationMembers(): void {
    if(!this.organizationId){
      return
    }

    this.organizationService.getMembers(this.organizationId).subscribe({
      next: (response) => {
        this.organizationMembers = response.members as Member[];
        this.filterOrganizationMembers();
      },
      error: (error) => {
        console.error('Error fetching organization members:', error);
      },
    });

    this.loadChatMembers();
  }

  loadChatMembers(): void {
    if(!this.selectedChat){
      return
    }

    this.chatMemberService.getChatMembersByChat(this.selectedChat?.id).subscribe({
      next: (response) => {
        this.chatMembers = response.chatMembers;
        this.filterOrganizationMembers();
      },
      error: (error) => {
        console.error('Error fetching chat members:', error);
      },
    });
  }

  filterOrganizationMembers(): void {
    this.filteredOrganizationMembers = this.organizationMembers.filter(
      (orgMember) => !this.chatMembers.some((chatMember) => chatMember.memberId === orgMember.id)
    );
  }

  inviteMemberToChat(member: Member): void {
    if (!this.selectedChat) return;

    const inviteData = {
      nickname: this.nickname,
      member: member.id,
      chat: this.selectedChat.id,
    };

    this.chatMemberService.inviteChatMember(inviteData).subscribe({
      next: (response) => {
        this.nickname = '';
      },
      error: (error) => {
        console.error('Error inviting member:', error);
      },
    });
  }

  deleteChat(): void {
    if (!this.selectedChat) return;

    this.chatService.deleteChat(this.selectedChat.id).subscribe({
      next: () => {
        this.chatDeleted.emit();
      },
      error: (error) => {
        console.error('Error deleting chat:', error);
      },
    });
  }

  editNickname(memberId: string): void {
    this.editingMemberId = memberId;
  }

  cancelNicknameChange(): void {
    this.editingMemberId = null;
  }

  acceptNicknameChange(member: ChatMembers, newNickname: string): void {
    if (!this.selectedChat || !newNickname) return;

    this.chatMemberService.updateNickname(member.memberId, newNickname).subscribe({
      next: () => {
        member.nickname = newNickname;
        this.editingMemberId = null;
      },
      error: (error) => {
        console.error(`Error updating nickname for member ${member.memberId}:`, error);
      },
    });
  }


}

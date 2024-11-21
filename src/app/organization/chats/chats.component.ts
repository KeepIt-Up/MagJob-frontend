import {Component, Input, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Member} from "../settings/roles/model/role";
import {MembersService} from "../service/members.service";
import {OrganizationService} from "../service/organization.service";
import {DeleteMembersComponent} from "../components/organization-members/view/delete-members/delete-members.component";
import {EditMemberComponent} from "../components/organization-members/view/edit-member/edit-member.component";
import {ChatService} from "../service/chat.service";
import {Chat, ChatResponse, ChatsResponse, CreateChatRequest} from "../model/chat";
import {FormsModule} from "@angular/forms";
import {ChatMemberService} from "../service/chat.member.service";
import {ChatsListComponent} from "./chats-list/chats-list.component";
import {ChatsDetailsComponent} from "./chats-details/chats-details.component";
import {ChatsCreateComponent} from "./chats-create/chats-create.component";

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    DeleteMembersComponent,
    EditMemberComponent,
    NgForOf,
    FormsModule,
    ChatsListComponent,
    ChatsDetailsComponent,
    ChatsCreateComponent
  ],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css'
})
export class ChatsComponent implements OnInit{
  @Input() organizationId?: string;

  viewSection: 'list' | 'detail' | 'create' = 'list';
    selectedChat: Chat | null = null;
  invitations: any[] = [];

  isChatOpen = false;

  ngOnInit(): void {
    this.viewSection = 'list';
  }

  selectChat(chat: Chat): void {
    this.selectedChat = chat;
    this.viewSection = 'detail';
  }

  toggleChatPanel() {
    this.isChatOpen = !this.isChatOpen;
  }

  onChatDeleted(): void {
    this.selectedChat = null;
    this.viewSection = 'list';
  }

  onChatCreate(): void {
    this.selectedChat = null;
    this.viewSection = 'list';
  }
}

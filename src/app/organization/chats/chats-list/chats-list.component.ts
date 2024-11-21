import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Chat, ChatMembers } from "../../model/chat";
import { FormsModule } from "@angular/forms";
import { NgForOf, NgIf } from "@angular/common";
import { ChatService } from "../../service/chat.service";
import { ChatMemberService } from "../../service/chat.member.service";
import { RolePermission } from "../../../auth/service/role.permission";
import { ButtonsComponent } from "../../../components/buttons/buttons.component";

@Component({
  selector: 'app-chats-list',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ButtonsComponent
  ],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.css'
})
export class ChatsListComponent implements OnInit {
  @Input() organizationId?: string;
  @Output() chatSelected = new EventEmitter<Chat>();

  chats: Chat[] = [];
  chatMembersMap: { [chatId: string]: ChatMembers[] } = {};
  memberId: string = '';
  loading: boolean = true;

  constructor(
    private chatService: ChatService,
    private chatMemberService: ChatMemberService,
    private rolePermission: RolePermission
  ) {}

  ngOnInit(): void {
    this.loadChats();
  }

  selectChat(chat: Chat): void {
    this.chatSelected.emit(chat);
  }

  async loadChats(): Promise<void> {
    if (!this.organizationId) return;
    try {
      this.memberId = await this.rolePermission.getMemberID(this.organizationId);
      if (!this.memberId) {
        console.log('No matching member found. Permissions cannot be checked.');
      }
    } catch (err) {
      console.error('Failed to load role:', err);
      this.loading = false;
      return;
    }

    this.chatService.getChatsByMember(this.memberId).subscribe({
      next: (response) => {
        this.chats = response.chats;

        const chatLoadPromises = this.chats.map(chat =>
          new Promise<void>((resolve) => {
            this.loadChatMembers(chat, resolve);
          })
        );

        Promise.all(chatLoadPromises).then(() => {
          this.loading = false;
        });
      },
      error: (error) => {
        console.error('Error loading chats by organization:', error);
        this.loading = false;
      },
    });
  }

  loadChatMembers(chat: Chat, resolve: () => void): void {
    if (this.chatMembersMap[chat.id]) {
      resolve();
      return;
    }

    this.chatMemberService.getChatMembersByChat(chat.id).subscribe({
      next: (response) => {
        this.chatMembersMap[chat.id] = response.chatMembers;
        resolve();
      },
      error: (error) => {
        console.error(`Error fetching chat members for chat ${chat.id}:`, error);
        resolve();
      },
    });
  }

  isMemberInChat(chat: Chat): boolean {
    const members = this.chatMembersMap[chat.id];
    if (!members) {
      return false;
    }
    return members.some(member => member.memberId === this.memberId);
  }

  acceptInvitation(chat: Chat): void {
    const inviteData = {
      chat: chat.id,
      member: this.memberId
    };
    this.chatMemberService.acceptInvitation(inviteData).subscribe({
      next: () => {
        console.log(`Invitation to chat "${chat.title}" accepted.`);
      },
      error: (error) => console.error('Error accepting invitation:', error),
    });
  }

  rejectInvitation(chat: Chat): void {
    const inviteData = {
      chat: chat.id,
      member: this.memberId
    };
    this.chatMemberService.rejectInvitation(inviteData).subscribe({
      next: () => {
        console.log(`Invitation to chat "${chat.title}" rejected.`);
      },
      error: (error) => console.error('Error rejecting invitation:', error),
    });
  }
}

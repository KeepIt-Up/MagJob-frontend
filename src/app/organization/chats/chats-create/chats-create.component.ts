import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Chat, CreateChatRequest} from "../../model/chat";
import {ChatService} from "../../service/chat.service";

@Component({
  selector: 'app-chats-create',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './chats-create.component.html',
  styleUrl: './chats-create.component.css'
})
export class ChatsCreateComponent {
  @Input() organizationId?: string;
  @Output() chatCreated = new EventEmitter<void>();

  newChat: CreateChatRequest = { title: '', organization: '0' };

  constructor(private chatService: ChatService) {}

  createChat(): void {
    if (this.organizationId) {
      this.newChat.organization = this.organizationId;
    }

    this.chatService.createChat(this.newChat).subscribe({
      next: () => {
        this.newChat = { title: '', organization: this.organizationId ?? '0' };
        this.chatCreated.emit();
      },
      error: (error) => console.error('Error creating chat:', error),
    });
  }
}

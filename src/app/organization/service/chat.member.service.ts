import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  InviteChatMemberRequest,
  ChatMember,
  InvitationRequest,
  ChatMember as UpdateChatMemberNicknameResponse,
  ChatMembers
} from '../model/chat'; // Update with the actual path to models

@Injectable({
  providedIn: 'root',
})
export class ChatMemberService {
  private baseUrl = '/api/chat-members';

  constructor(private http: HttpClient) {}

  inviteChatMember(data: InviteChatMemberRequest): Observable<ChatMember> {
    return this.http.post<ChatMember>(`${this.baseUrl}`, data);
  }

  removeAdminAccess(memberId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${memberId}/admin/remove`, {});
  }

  addAdminAccess(memberId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${memberId}/admin/add`, {});
  }

  rejectInvitation(data: InvitationRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/reject`, data);
  }

  acceptInvitation(data: InvitationRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/accept`, data);
  }

  updateNickname(id: string, nickname: string): Observable<UpdateChatMemberNicknameResponse> {
    return this.http.patch<UpdateChatMemberNicknameResponse>(`${this.baseUrl}/${id}`, { nickname });
  }

  getChatMembersByMember(memberId: string): Observable<ChatMember[]> {
    return this.http.get<ChatMember[]>(`/api/members/${memberId}/chat-members`);
  }

  getChatMembersByChat(chatId: string): Observable<{ chatMembers: ChatMembers[]; count: number }> {
    return this.http.get<{ chatMembers: ChatMembers[]; count: number }>(`/api/chats/${chatId}/chat-members`);
  }
}

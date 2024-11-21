import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatsResponse, CreateChatRequest, ChatResponse, UpdateChatRequest } from '../model/chat'; // Update with the actual path to models

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private baseUrl = '/api/chats';

  constructor(private http: HttpClient) {}

  getAllChats(pageNumber: number = 0, pageSize: number = 10): Observable<ChatsResponse> {
    return this.http.get<ChatsResponse>(`${this.baseUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  createChat(chatData: CreateChatRequest): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(`${this.baseUrl}`, chatData);
  }

  getChatById(id: String): Observable<ChatResponse> {
    return this.http.get<ChatResponse>(`${this.baseUrl}/${id}`);
  }

  deleteChat(id: String): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  updateChat(id: String, chatData: UpdateChatRequest): Observable<ChatResponse> {
    return this.http.patch<ChatResponse>(`${this.baseUrl}/${id}`, chatData);
  }

  getChatsByOrganization(organizationId: String, pageNumber: number = 0, pageSize: number = 10): Observable<ChatsResponse> {
    return this.http.get<ChatsResponse>(`/api/organizations/${organizationId}/chats?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  getChatsByMember(memberId: String, pageNumber: number = 0, pageSize: number = 10): Observable<ChatsResponse> {
    return this.http.get<ChatsResponse>(`/api/members/${memberId}/chats?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }
}

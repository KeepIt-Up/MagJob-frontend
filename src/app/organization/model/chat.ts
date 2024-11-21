export interface Chat {
  id: string;
  title: string;
}

export interface ChatsResponse {
  chats: Chat[];
  count: string;
}

export interface CreateChatRequest {
  title: string;
  organization: string;
}

export interface Organization {
  id: string;
  name: string;
}

export interface ChatResponse {
  id: string;
  title: string;
  dateCreation: string;
  organization: Organization;
}

export interface UpdateChatRequest {
  title: string;
}

export interface InviteChatMemberRequest {
  nickname: string;
  member: string;
  chat: string;
}

export interface ChatMember {
  id: string;
  member: {
    id: string;
    pseudonym: string;
  };
  chat: {
    id: string;
    title: string;
  };
  nickname: string;
  isInvitationAccepted: boolean;
}

export interface ChatMembers{
  id: string;
  nickname: string;
  memberId: string;
}

export interface InvitationRequest {
  member: string;
  chat: string;
}

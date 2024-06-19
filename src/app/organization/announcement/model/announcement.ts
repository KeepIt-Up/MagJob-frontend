import { FormControl, FormGroup } from "@angular/forms";
import { Member } from "../../components/organization-members/model/member";

export interface Announcement {
    id: string,
    title: string,
    content: string,
    dateOfExpiration: Date | undefined,
    author: Member
}

export interface AnnouncementCreatePayload {
    title: string,
    content: string,
    dateOfExpiration: Date,
    organization: string
}

export interface AnnouncementUpdatePayload {
    title?: string,
    content?: string,
    dateOfExpiration?: Date
}

export type AnnouncementCreateForm = FormGroup<{
    title: FormControl<string>;
    content: FormControl<string>;
    dateOfExpiration: FormControl<Date>;
  }>;
  
export type AnnouncementCreateFormValue = ReturnType<AnnouncementCreateForm['getRawValue']>;

export type AnnouncementUpdateForm = FormGroup<{
    title: FormControl<string>;
    content: FormControl<string>;
  }>;
  
export type AnnouncementUpdateFormValue = ReturnType<AnnouncementUpdateForm['getRawValue']>;
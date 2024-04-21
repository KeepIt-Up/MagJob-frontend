import { Member } from "../../components/organization-members/model/member";

export interface Announcement {
    id: string,
    title: string,
    content: string,
    dateOfExpiration: Date,
    author: Member
}

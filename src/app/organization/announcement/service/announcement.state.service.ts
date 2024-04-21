import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Announcement } from '../model/announcement';

export type AnnouncementState = {
  announcements: Announcement[]
}

const initialState = {
  announcements: []
}

@Injectable({
  providedIn: 'root'
})
export class AnnouncementStateService {

  constructor() { }

  private state$ = new BehaviorSubject<AnnouncementState>(initialState);

  value$ = this.state$.asObservable();

  addAnnouncement(announcement: Announcement)
  {
    this.state$.next({
      announcements: [...this.state$.value.announcements, announcement]
    });
  }

  setAnnouncements(announcements: Announcement[])
  {
    this.state$.next({
      announcements
    });
  }

  removeAnnouncement(announcementId: string)
  {
    const updatedAnnouncements = this.state$.value.announcements.filter((announcement) => {
      return announcement.id !== announcementId;
    });

    this.state$.next({
      announcements: updatedAnnouncements
    });
  }

  updateAnnouncement(updatedAnnouncement: Announcement)
  {
    const updatedAnnouncements = this.state$.value.announcements.map((announcement) => {
      return announcement.id === updatedAnnouncement.id ? updatedAnnouncement : announcement;
    });

    this.state$.next({
      announcements: updatedAnnouncements
    });
  }
}

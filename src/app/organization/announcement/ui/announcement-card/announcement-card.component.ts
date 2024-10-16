import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { Announcement, AnnouncementUpdateForm, AnnouncementUpdateFormValue } from '../../model/announcement';
import { CommonModule, DatePipe } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import {AuthStateService} from "../../../../auth/service/auth.state.service";

@Component({
  selector: 'app-announcement-card',
  standalone: true,
  imports: [CommonModule, DatePipe, ReactiveFormsModule],
  templateUrl: './announcement-card.component.html',
  styleUrls: ['./announcement-card.component.css']
})
export class AnnouncementCardComponent implements OnInit, OnChanges{
  @Input({required: true}) announcement!: Announcement;
  @Output() delete = new EventEmitter<string>();
  @Output() update = new EventEmitter<{id: string, title: string, content: string}>();

  private formBuilder = inject(NonNullableFormBuilder);
  private authStateService = inject(AuthStateService);

  isEditMode: boolean = false;
  userID: string = '';
  permission: boolean = false;


  announcementUpdateForm: AnnouncementUpdateForm = this.formBuilder.group({
    title: this.formBuilder.control<string>(""),
    content: this.formBuilder.control<string>("")
  });

  ngOnInit(): void {
    this.checkPermission();
    this.initFormValue();
  }

  async checkPermission() {
    this.userID = this.authStateService.getUserID();
    this.permission = await this.authStateService.getUserPermissions('Announcement');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initFormValue();
  }

  private initFormValue()
  {
    const announcementFormValue: AnnouncementUpdateFormValue = {
      title: this.announcement.title,
      content: this.announcement.content
    }

    this.announcementUpdateForm.setValue(announcementFormValue);
  }

  toggleMode()
  {
    this.isEditMode = !this.isEditMode;
  }

  submit()
  {

  }

  reject()
  {
    this.announcementUpdateForm.reset();
    this.initFormValue();
    this.toggleMode();
  }
}

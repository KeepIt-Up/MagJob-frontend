import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { Announcement, AnnouncementUpdateForm, AnnouncementUpdateFormValue } from '../../model/announcement';
import { CommonModule, DatePipe } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import {AuthStateService} from "../../../../auth/service/auth.state.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {RolePermission} from "../../../../auth/service/role.permission";

@Component({
  selector: 'app-announcement-card',
  standalone: true,
  imports: [CommonModule, DatePipe, ReactiveFormsModule],
  templateUrl: './announcement-card.component.html',
  styleUrls: ['./announcement-card.component.css']
})
export class AnnouncementCardComponent implements OnInit, OnChanges{
  @Input({required: true}) announcement!: Announcement;
  @Input() organizationId!: string;
  @Output() delete = new EventEmitter<string>();
  @Output() update = new EventEmitter<{id: string, title: string, content: string}>();

  private formBuilder = inject(NonNullableFormBuilder);
  private rolePermission = inject(RolePermission);
  private route = inject(ActivatedRoute);

  isEditMode: boolean = false;
  permission: boolean = false;

  routeSub?: Subscription;

  announcementUpdateForm: AnnouncementUpdateForm = this.formBuilder.group({
    title: this.formBuilder.control<string>(""),
    content: this.formBuilder.control<string>("")
  });

  ngOnInit(): void {
    this.routeSub = this.route.parent?.paramMap.subscribe({
      next: (value) => {
        const organizationId = value.get('organizationId');
        if (organizationId !== null) {
          this.organizationId = organizationId;
        } else {
          alert('Error while getting organizationId from route');
        }
      },
      error: (err) =>
      {
        console.log(err)
      }
    });
    this.checkPermission();
    this.initFormValue();
  }

  async checkPermission() {
    this.permission = await this.rolePermission.getUserPermissions('Announcement', this.organizationId);
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

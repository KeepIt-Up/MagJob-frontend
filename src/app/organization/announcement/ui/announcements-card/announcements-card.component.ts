import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { AnnouncementCardComponent } from '../announcement-card/announcement-card.component';
import { AnnouncementService } from '../../service/announcement.service';
import { LIST_STATE_VALUE } from '../../utils/list-state.type';
import { AnnouncementUpdatePayload } from '../../model/announcement-update-payload';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AnnouncementCreatePayload } from '../../model/announcement-create-payload';

type TasksListFiltersForm = FormGroup<{
  title: FormControl<string>;
  content: FormControl<string>;
  dateOfExpiration: FormControl<Date>;
}>;

@Component({
  selector: 'app-announcements-card',
  standalone: true,
  imports: [CommonModule, AnnouncementCardComponent, ReactiveFormsModule],
  templateUrl: './announcements-card.component.html',
  styleUrls: ['./announcements-card.component.css'],
})
export class AnnouncementsCardComponent implements OnInit {
  @Input({ required: true }) organizationId!: string;
  private roleService = inject(AnnouncementService);
  private formBuilder = inject(NonNullableFormBuilder);
  listStateValue = LIST_STATE_VALUE;
  listState$ = this.roleService.listState$;

  form: TasksListFiltersForm = this.formBuilder.group({
    title: this.formBuilder.control<string>('', Validators.required),
    content: this.formBuilder.control<string>('', Validators.required),
    dateOfExpiration: this.formBuilder.control<Date>(new Date(), Validators.required),
  });

  ngOnInit() {
    this.roleService.getAllByOrganizationId(this.organizationId);
  }

  deleteAnnouncemnet(id: string) {
    this.roleService.delete(id);
  }

  updateAnnouncement(payload: any) {
    this.roleService.update(payload.id, payload as AnnouncementUpdatePayload);
  }

  createAnnouncement() {
    if (this.form.valid) {
      let formValue = this.form.value;
      let payload: AnnouncementCreatePayload = {
        content: formValue.content!,
        dateOfExpiration: new Date(formValue.dateOfExpiration!),
        title: formValue.title!,
        organization: this.organizationId
      }
    this.roleService.create(payload);
    }
  }
}

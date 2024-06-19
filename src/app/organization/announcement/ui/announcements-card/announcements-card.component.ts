import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, Signal, inject } from '@angular/core';
import { AnnouncementCardComponent } from '../announcement-card/announcement-card.component';
import { AnnouncementService } from '../../service/announcement.service';
import { LIST_STATE_VALUE } from '../../utils/list-state.type';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AnnouncementCreateForm, AnnouncementCreatePayload, AnnouncementUpdatePayload } from '../../model/announcement';


@Component({
  selector: 'app-announcements-card',
  standalone: true,
  imports: [CommonModule, AnnouncementCardComponent, ReactiveFormsModule],
  templateUrl: './announcements-card.component.html',
  styleUrls: ['./announcements-card.component.css'],
})
export class AnnouncementsCardComponent implements OnInit, OnDestroy {
  @Input({ required: true }) organizationId!: string;
  @Input() id!: Signal<string>;
  private announcementService = inject(AnnouncementService);
  private formBuilder = inject(NonNullableFormBuilder);
  private route = inject(ActivatedRoute);

  routeSub?: Subscription;

  listStateValue = LIST_STATE_VALUE;
  listState$ = this.announcementService.listState$;

  form: AnnouncementCreateForm = this.formBuilder.group({
    title: this.formBuilder.control<string>('', Validators.required),
    content: this.formBuilder.control<string>('', Validators.required),
    dateOfExpiration: this.formBuilder.control<Date>(new Date(), Validators.required),
  });

  
  ngOnInit() {
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
    this.announcementService.getAllByOrganizationId(this.organizationId);
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  deleteAnnouncemnet(id: string) {
    this.announcementService.delete(id);
  }

  updateAnnouncement(payload: any) {
    this.announcementService.update(payload.id, payload as AnnouncementUpdatePayload);
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
    this.announcementService.create(payload);
    this.form.reset();
    }
  }
}

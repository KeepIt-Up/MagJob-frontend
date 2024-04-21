import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Announcement } from '../../model/announcement';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-announcement-card',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './announcement-card.component.html',
  styleUrls: ['./announcement-card.component.css']
})
export class AnnouncementCardComponent {
  @Input({required: true}) announcement!: Announcement;
  @Output() delete = new EventEmitter<string>();
  @Output() update = new EventEmitter<{id: string, title: string, content: string}>();

  isEditMode: boolean = false;

  toggleMode()
  {
    this.isEditMode = !this.isEditMode;
    console.log(this.isEditMode)
  }
}

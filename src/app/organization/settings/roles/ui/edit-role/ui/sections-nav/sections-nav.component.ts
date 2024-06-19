import { Component, EventEmitter, Input, Output, Signal } from '@angular/core';
import { SectionType, SectionTypeValue } from '../../../../roles.component';

@Component({
  selector: 'app-sections-nav',
  standalone: true,
  imports: [],
  templateUrl: './sections-nav.component.html',
  styleUrl: './sections-nav.component.css'
})
export class SectionsNavComponent {
  @Input({required: true}) selectedSection!: SectionTypeValue;
  @Input({required: true}) membersCount$!: Signal<number>;
  @Output() changeSection = new EventEmitter<SectionTypeValue>();

  SectionTypeValue = SectionType;
}

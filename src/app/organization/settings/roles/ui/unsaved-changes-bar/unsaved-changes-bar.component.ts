import { Component } from '@angular/core';

@Component({
  selector: 'app-unsaved-changes-bar',
  standalone: true,
  imports: [],
  templateUrl: './unsaved-changes-bar.component.html',
  styleUrl: './unsaved-changes-bar.component.css'
})
export class UnsavedChangesBarComponent {
  changes:boolean = false;
}

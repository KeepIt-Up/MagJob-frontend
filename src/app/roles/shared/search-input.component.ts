import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  template: `<input #textInput class="form-control" type="text" id="text" [placeholder]="placeholder" (keyup)="submit.emit(textInput.value)" />`
})
export class SearchComponent {
  @Input() placeholder: string = '';
  @Output() submit = new EventEmitter<string>();
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Role } from '../../../../model/role';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
 @Input({required: true}) role!: {id: string, name: string};
 @Output() delete = new EventEmitter<string>();
}

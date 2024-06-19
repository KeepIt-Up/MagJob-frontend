import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RoleForm } from '../../../../service/service/role-form.service';

@Component({
  selector: 'app-appearance',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './appearance.component.html'
})
export class AppearanceComponent {
  @Input({required: true}) roleForm!: RoleForm;
}

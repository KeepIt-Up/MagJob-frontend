import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Role } from '../../model/role';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

type RoleApperianceForm = FormGroup<{
  name: FormControl<string>;
}>;

@Component({
  selector: 'app-apperiance',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './apperiance.component.html',
})
export class ApperianceComponent implements OnInit {
  @Input({ required: true }) role!: Role;
  roleForm!: RoleApperianceForm;
  private _formBuilder = inject(NonNullableFormBuilder);

  ngOnInit(): void {
    this.roleForm = this._formBuilder.group({
      name: this._formBuilder.control<string>(this.role ? this.role.name : '', [
        Validators.required,
      ]),
    });
  }
}

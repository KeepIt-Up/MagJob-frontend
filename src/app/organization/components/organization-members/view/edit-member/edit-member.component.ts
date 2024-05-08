import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Member } from '../../model/member';
import { OrganizationMembersService } from '../../service/organization-members.service';

type MemberEditForm = FormGroup<{
  newPseudonym: FormControl<string>;
}>;

@Component({
  selector: 'app-edit-member',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.css']
})
export class EditMemberComponent {

  @Input({ required: true }) member!: Member;
  @Output() requestMemberUpdate = new EventEmitter<{id: number, pseudonym: string}>();
  private formBuilder = inject(NonNullableFormBuilder);
  constructor( private organizationMembersService: OrganizationMembersService ) {}

  form: MemberEditForm = this.formBuilder.group({
    newPseudonym: this.formBuilder.control<string>('', Validators.required)
  });


  confirmMemberEdit() {
    if (this.form.valid) {
      let formValue = this.form.value;
      this.requestMemberUpdate.emit({id: this.member.id, pseudonym: formValue.newPseudonym!});
    }
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../../model/user';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  userForm!: FormGroup;
  userData: User | null = null;
  userId!: number;
  originalFormData: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.userId = params['id'];

      this.userService.getUserData(this.userId).subscribe((data: User) => {
        this.userData = { ...data };
        this.originalFormData = { ...this.userData };

        this.userForm = this.formBuilder.group({
          firstname: [this.userData?.firstname],
          lastname: [this.userData?.lastname],
          email: [this.userData?.email],
          phoneNumber: [this.userData?.phoneNumber],
          birthDate: [this.userData?.birthDate]
        });
      });


    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  viewSettings(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.router.navigate([`/user/${this.userId}/settings`]);
    });
  }

  isFormDirty(): boolean {
    return this.userForm.dirty;
  }

  submitChanges(): void {
    this.userService.updateUserData(this.userId, this.userForm.value).subscribe(response => {
      console.log('User updated successfully', response);
      this.userForm.reset(this.userForm.value);
    }
    )
  }

  
}

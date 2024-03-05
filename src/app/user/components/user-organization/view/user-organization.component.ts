import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProfileService } from '../../../service/user-profile.service';
import { UserProfile } from '../../../model/user-profile';
@Component({
  selector: 'app-user-organization',
  templateUrl: './user-organization.component.html',
  styleUrls: ['./user-organization.component.css']
})
export class UserOrganizationComponent implements OnInit {
  userProfile!: UserProfile;
  userId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private userProfileService: UserProfileService,
  ) {}

  ngOnInit(): void {
    const userIdParam = this.route.snapshot.paramMap.get('id');

    }
  }


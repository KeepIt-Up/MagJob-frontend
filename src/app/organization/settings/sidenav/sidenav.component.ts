import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterLinkActive} from '@angular/router';
import {Subscription} from "rxjs";
import {RolePermission} from "../../../auth/service/role.permission";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit{
  organizationId!: string;
  routeSub?: Subscription;
  permission: boolean = false;

  constructor(private route: ActivatedRoute,
              private rolePermissionService: RolePermission
  ) {
  }

  async ngOnInit(): Promise<void> {
    try {
      this.routeSub = this.route.parent?.paramMap.subscribe({
        next: (value) => {
          const organizationId = value.get('organizationId');
          if (organizationId !== null) {
            this.organizationId = organizationId;
          } else {
            alert('Error while getting organizationId from route');
          }
        },
        error: (err) => {
          console.error(err);
        },
      });

      await this.checkPermission();

    } catch (error) {
      console.error('Error during initialization:', error);
    }
  }

  async checkPermission(): Promise<void> {
    try {
      this.permission = await this.rolePermissionService.getUserPermissions('Role', this.organizationId);
    } catch (error) {
      console.error('Error in checkPermission:', error);
    }
  }
}

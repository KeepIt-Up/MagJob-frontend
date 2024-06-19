import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Permission } from '../../model/permission';
import { SearchComponent } from 'src/app/roles/shared/search-input.component';
import { Role } from '../../model/role';

@Component({
  selector: 'app-permissions-list',
  standalone: true,
  imports: [CommonModule, SearchComponent],
  template: ` <div class="container">

    <div class="mb-3 m-2">
        <app-search placeholder="Find permission"></app-search>
    </div>

    <!-- <div *ngFor="let permission of permissions">
      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
        />
        <label class="form-check-label" for="flexSwitchCheckDefault">{{
          permission.name
        }}</label>
      </div>
    </div> -->
  </div>`,
})
export class PermissionsComponent {
  @Input({required: true}) role!: Role;

}

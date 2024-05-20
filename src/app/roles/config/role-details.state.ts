import { Injectable, signal } from "@angular/core"
import { ROLE_PAGE, EditRolePage } from "../shared/enums/edit-role-page.enum"

type RoleDetailsState = {
    editRolePage: EditRolePage
}

@Injectable({
    providedIn: 'root',
  })
export class RoleDetailsStateService {
    private state = signal<RoleDetailsState>({
        editRolePage: ROLE_PAGE.APPERIANCE_PAGE
    });

    $value = this.state.asReadonly();

    updateRolePage(value: EditRolePage) {
        this.state.update((state) => {
            return {
                ...state,
                editRolePage: value,
            };
        });
    }
}
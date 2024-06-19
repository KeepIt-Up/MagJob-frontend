import { Component, Input } from '@angular/core';
import { Permission } from '../../../../model/permission';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PermissionForm } from '../../../../service/service/role-form.service';

@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './permissions.component.html'
})
export class PermissionsComponent {
  @Input({required: true}) permissionsForm?: PermissionForm;
  
  //TODO refactor !!!
  permissions: Permission[] = [
    {
      id: '1',
      name: 'Zarządzanie zadaniami',
      description: 'Pozwala na tworzenie, edytowanie i usuwanie zadań'
    },
    {
      id: '2',
      name: 'Zarządzanie rolami',
      description: 'Pozwala na tworzenie, edytowanie i usuwanie ról i związanymi z nimi uprawnieniami'
    },
    {
      id: '3',
      name: 'Zarządzanie ogłoszeniami',
      description: 'Pozwala na tworzenie, edytowanie i usuwanie ogłoszeń'
    },
    {
      id: '4',
      name: 'Tworzenie zaproszeń',
      description: 'Pozwala użytkownikowi na zapraszanie nowych użytkowników do organizacji'
    }
  ];
}

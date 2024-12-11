import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../../../service/task-service.service';
import { CreateTask } from '../../../model/task';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ButtonsComponent } from '../../../../components/buttons/buttons.component';
import {RolePermission} from "../../../../auth/service/role.permission";

@Component({
  selector: 'app-organization-tasks-create',
  templateUrl: './organization-tasks-create.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ButtonsComponent
  ],
  styleUrls: ['./organization-tasks-create.component.css']
})
export class OrganizationTasksCreateComponent implements OnInit {
  @Input() userID: string = '';
  @Input() organizationId: string = '';

  newTask: CreateTask = {
    title: '',
    description: '',
    priority: 'LOW',
    status: 'NEW',
    deadLine: '',
    organization: Number(this.organizationId),
    creator: Number(this.userID)
  };

  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute, private rolePermissionService: RolePermission) {}

  ngOnInit(): void {
    this.rolePermissionService.getMemberID(this.organizationId)
      .then(userID => {
        this.userID = userID;
      })
      .catch(error => {
        console.error('Error fetching member ID:', error);
      });
  }

  onSubmit(): void {
    this.newTask.organization = Number(this.organizationId);
    this.newTask.creator = Number(this.userID);

    this.newTask.deadLine = this.getFormattedDeadline(new Date(this.newTask.deadLine));


    this.taskService.createTask(this.newTask).subscribe(
      (response) => {
        console.log('Task created successfully:', response);
        this.router.navigate([`organization/${this.organizationId}/tasks`]);
        window.location.reload();
      },
      (error: any) => {
        console.error('Error creating task:', error);
      }
    );
  }

  getFormattedDeadline(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}T00:00:00.000Z`;
  }

  onCancel(): void {
    this.router.navigate([`organization/${this.organizationId}/tasks`]);
  }
}

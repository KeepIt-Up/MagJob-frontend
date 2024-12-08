import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../../../service/task-service.service';
import {Task} from '../../../model/task';
import { CommonModule } from '@angular/common';
import {  ActivatedRoute} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription} from 'rxjs';
import {ButtonsComponent} from "../../../../components/buttons/buttons.component";
import {MatButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {OrganizationTasksCreateComponent} from "../organization-tasks-create/organization-tasks-create.component";
import {OrganizationTaskComponent} from "../organization-task/organization-task.component";
import {RoleResponse} from "../../../../roles/model/role";
import {RolePermission} from "../../../../auth/service/role.permission";

@Component({
  selector: 'app-organization-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonsComponent, MatButton, MatTooltip, OrganizationTasksCreateComponent,  OrganizationTaskComponent],
  templateUrl: './organization-tasks.component.html',
  styleUrls: ['./organization-tasks.component.css'],
})
export class OrganizationTasksComponent implements OnInit {
  @Input() organizationId!: string;
  tasks: Task[] = [];
  filteredTasks: Task[] = [];


  filter = {
    deadlineDate: null,
    completed: false,
    notCompleted: false,
    isImportant: false
  };
  userID: string = '';
  memberId: string = '';

  permission: boolean = false;
  role: RoleResponse | null = null;

  routeSub?: Subscription;

  constructor(private taskService: TaskService,
              private route: ActivatedRoute,
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

      this.loadTasks();
    } catch (error) {
      console.error('Error during initialization:', error);
    }
  }

  async checkPermission(): Promise<void> {
    try {
      this.userID = this.rolePermissionService.getUserID();

      this.memberId = await this.rolePermissionService.getMemberID(this.organizationId);

      this.permission = await this.rolePermissionService.getUserPermissions('Task', this.organizationId);
    } catch (error) {
      console.error('Error in checkPermission:', error);
    }
  }


  loadTasks(): void {
    this.taskService.getTasksByOrganization(this.organizationId).subscribe({
      next: (tasks: any) => {
        this.tasks = tasks.tasks;
        this.filteredTasks = tasks.tasks;
      },
      error: (error: any) => {
        console.error('Error loading tasks:', error);
      },
    });
  }


  filterTasks(): void {
    this.filteredTasks = this.tasks.filter(task => {
      let matchesDeadlineFilter = true;
      let matchesCompletionFilter = true;
      let matchesImportantFilter = true;

      if (this.filter.deadlineDate) {
        matchesDeadlineFilter = new Date(task.deadLine) >= new Date(this.filter.deadlineDate);
      }

      if (this.filter.completed && !this.filter.notCompleted) {
        matchesCompletionFilter = task.status === 'DONE';
      } else if (!this.filter.completed && this.filter.notCompleted) {
        matchesCompletionFilter = task.status !== 'DONE';
      }

      if (this.filter.isImportant) {
        matchesImportantFilter = task.priority === 'HIGH';
      }

      return matchesDeadlineFilter && matchesCompletionFilter && matchesImportantFilter;
    });
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(
      () => {
        console.log('Task deleted successfully.');
        this.loadTasks();
      },
      (error: any) => {
        console.error('Error deleting task:', error);
      }
    );
  }

}


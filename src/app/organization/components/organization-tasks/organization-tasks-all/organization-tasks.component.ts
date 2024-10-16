import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../../../service/task-service.service';
import { Task } from '../../../model/task';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { concatMap, map, toArray } from 'rxjs/operators';
import {AuthStateService} from "../../../../auth/service/auth.state.service";
import {RoleService} from "../../../../roles/service/role.service";
import {ButtonsComponent} from "../../../../components/buttons/buttons.component";
import {MatButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {OrganizationTasksCreateComponent} from "../organization-tasks-create/organization-tasks-create.component";
import {OrganizationTaskComponent} from "../organization-task/organization-task.component";
import {RoleResponse} from "../../../../roles/model/role";
import {MemberRoleService} from "../../../../roles/service/member-role.service";

@Component({
  selector: 'app-organization-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonsComponent, MatButton, MatTooltip, OrganizationTasksCreateComponent,  OrganizationTaskComponent],
  templateUrl: './organization-tasks.component.html',
  styleUrls: ['./organization-tasks.component.css'],
})
export class OrganizationTasksComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];

  organizationId!: number;

  filter = {
    deadlineDate: null,
    completed: false,
    notCompleted: false,
    isImportant: false
  };
  userID: string = '';

  permission: boolean = false;
  role: RoleResponse | null = null;

  constructor(private taskService: TaskService,
              private router: Router,
              private route: ActivatedRoute,
              private authStateService: AuthStateService,
              private roleService: RoleService,
              private memberRoleService: MemberRoleService
    ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.organizationId = params['organizationId'];
    });
    this.loadTasks();
    this.checkPermission()
  }

  async checkPermission() {
    this.userID = this.authStateService.getUserID();
    this.permission = await this.authStateService.getUserPermissions('Task');
  }


  loadTasks(): void {
    this.taskService.getTasks().pipe(
      concatMap(response => {
        const taskDetails$ = response.tasks.map(task => this.taskService.getTask(task.id));
        return forkJoin(taskDetails$);
      }),
      toArray()
    ).subscribe({
      next: (tasks) => {
        this.tasks = tasks[0];
        this.filteredTasks = tasks[0];
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
        matchesDeadlineFilter = new Date(task.deadLine) > new Date(this.filter.deadlineDate);
      }

      if (this.filter.completed && !this.filter.notCompleted) {
        matchesCompletionFilter = task.isDone;
      } else if (!this.filter.completed && this.filter.notCompleted) {
        matchesCompletionFilter = !task.isDone;
      }

      if (this.filter.isImportant) {
        matchesImportantFilter = task.isImportant;
      }

      return matchesDeadlineFilter && matchesCompletionFilter && matchesImportantFilter;
    });
  }

  toggleIsDone(task: Task): void {
    if (task.isDone === false) {
      task.isDone = !task.isDone;
      this.taskService.completeTask(task.id).subscribe(
        () => {
          this.filterTasks();
        },
        (error: any) => {
          console.error('Error updating task:', error);
        }
      );
    } else {
    }
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


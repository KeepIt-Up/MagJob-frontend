import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../../../service/task-service.service';
import { Task } from '../../../model/task';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { concatMap, map, toArray } from 'rxjs/operators';
import {AuthStateService} from "../../../../auth/service/auth.state.service";

@Component({
  selector: 'app-organization-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
  userRole: string = '';
  showNoPermission = false;

  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute, private authStateService: AuthStateService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.organizationId = params['organizationId'];
    });
    this.loadTasks();
    this.userRole = this.authStateService.getUserRole();
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

  showNoPermissionMessage(event: Event): void {
    event.preventDefault();
    this.showNoPermission = true;
    setTimeout(() => {
      this.showNoPermission = false;
    }, 3000);
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
          console.log('Task updated successfully.');
          this.filterTasks();
        },
        (error: any) => {
          console.error('Error updating task:', error);
        }
      );
    } else {
      console.log('Task is already done.');
    }
  }

  deleteTask(id: BigInteger): void {
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

  navigateToCreateTask(): void {
    this.router.navigate([`organization/${this.organizationId}/tasks-create`]);
  }

  navigateToUpdate(idUpdate: BigInteger): void {
    this.router.navigate([`organization/${this.organizationId}/task-update`, idUpdate]);
  }
}


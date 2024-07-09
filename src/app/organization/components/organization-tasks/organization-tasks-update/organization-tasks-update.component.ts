import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../service/task-service.service';
import { UpdateTask, Task } from '../../../model/task';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-organization-tasks-update',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './organization-tasks-update.component.html',
  styleUrls: ['./organization-tasks-update.component.css'],
})
export class OrganizationTasksUpdateComponent implements OnInit {
  taskId!: number;
  organizationId!: number;

  task: UpdateTask = {
    title: '',
    description: '',
    deadLine: '',
    isImportant: false
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.taskId = params['idUpdate'];
      this.organizationId = params['organizationId'] || 1; // domyślna wartość !!!
      this.loadTask();
    });
  }

  loadTask(): void {
    this.taskService.getTask(this.taskId).subscribe({
      next: (task: Task) => {
        this.task = {
          title: task.title,
          description: task.description,
          deadLine: task.deadLine.toString(),
          isImportant: task.isImportant
        };
      },
      error: (error: any) => {
        console.error('Error loading task:', error);
      }
    });
  }

  onSubmit(): void {
    this.taskService.updateTask(this.taskId, this.task).subscribe({
      next: () => {
        console.log('Task updated successfully.');
        this.router.navigate([`organization/${this.organizationId}/tasks`]);
      },
      error: (error: any) => {
        console.error('Error updating task:', error);
      }
    });
  }

  onCancel() {
    this.router.navigate([`organization/${this.organizationId}/tasks`]);
  }
}

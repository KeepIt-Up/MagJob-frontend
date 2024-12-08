import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Task, UpdateTask } from '../../../model/task';
import { ButtonsComponent } from "../../../../components/buttons/buttons.component";
import { NgIf } from "@angular/common";
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../service/task-service.service';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-organization-task',
  standalone: true,
  imports: [
    ButtonsComponent,
    NgIf,
    FormsModule
  ],
  templateUrl: './organization-task.component.html',
  styleUrls: ['./organization-task.component.css']
})
export class OrganizationTaskComponent implements OnInit{
  @Input() task!: Task;
  @Input() permission: boolean = false;
  @Output() delete: EventEmitter<void> = new EventEmitter();

  updateTask: UpdateTask = {
    title: '',
    description: '',
    priority: '',
    status: '',
    deadLine: ''
  };

  organizationId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.organizationId = params['organizationId'];
    });
    this.loadTask();
  }

  loadTask(): void {
    this.updateTask.deadLine = this.formatDate(this.task.deadLine);
    this.updateTask.title = this.task.title;
    this.updateTask.priority = this.task.priority || 'LOW';
    this.updateTask.status = this.task.status || 'NEW';
    this.updateTask.description = this.task.description;
  }

  formatDate(date: Date | string | undefined): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString();
  }

  onSubmit(): void {
    if (this.updateTask.deadLine) {
    this.updateTask.deadLine = this.formatDate(this.updateTask.deadLine);
  }
    this.taskService.updateTask(this.task.id, this.updateTask).subscribe({
      next: () => {
        this.router.navigate([`organization/${this.organizationId}/tasks`]);
        window.location.reload();
      },
      error: (error: any) => {
        console.error('Error updating task:', error);
      }
    });
  }

  onCancel(): void {
    this.router.navigate([`organization/${this.organizationId}/tasks`]);
  }

  onDelete(): void {
    this.delete.emit();
  }
}

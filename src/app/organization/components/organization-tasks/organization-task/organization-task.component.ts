import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Task, UpdateTask } from '../../../model/task';
import { ButtonsComponent } from "../../../../components/buttons/buttons.component";
import { NgIf } from "@angular/common";
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../service/task-service.service';
import { FormsModule } from "@angular/forms";
import {RolePermission} from "../../../../auth/service/role.permission";
import {Subscription} from "rxjs";

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
  routeSub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private rolePermissionService: RolePermission
  ) {}

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

      this.loadTask();
    } catch (error) {
      console.error('Error during initialization:', error);
    }
  }

  loadTask(): void {
    this.updateTask.deadLine = this.formatDate(this.task.deadLine);
    this.updateTask.title = this.task.title;
    this.updateTask.priority = this.task.priority || 'LOW';
    this.updateTask.status = this.task.status || 'NEW';
    this.updateTask.description = this.task.description;
  }

  async checkPermission(): Promise<void> {
    try {
      this.permission = await this.rolePermissionService.getUserPermissions('Role', this.organizationId);
    } catch (error) {
      console.error('Error in checkPermission:', error);
    }
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

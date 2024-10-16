import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Task, UpdateTask} from '../../../model/task';
import {ButtonsComponent} from "../../../../components/buttons/buttons.component";
import {NgIf} from "@angular/common";
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../service/task-service.service';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-organization-task',
  standalone: true,
  imports: [
    ButtonsComponent,
    NgIf,
    FormsModule
  ],
  templateUrl: './organization-task.component.html',
  styleUrl: './organization-task.component.css'
})
export class OrganizationTaskComponent {
  @Input() task!: Task;
  @Input() permission: boolean = false;
  @Output() toggleDone: EventEmitter<void> = new EventEmitter();
  @Output() delete: EventEmitter<void> = new EventEmitter();

  updateTask: UpdateTask = {
    title: '',
    description: '',
    deadLine: '',
    isImportant: false
  };
  private organizationId: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.organizationId = params['organizationId'];
    });
    this.loadTask()
  }

  loadTask(): void {
    this.updateTask.deadLine = this.formatDate(this.task.deadLine);
    this.updateTask.title = this.task.title;
    this.updateTask.isImportant = this.task.isImportant;
    this.updateTask.description = this.task.description;
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}.000Z`;
  }

  onSubmit(): void {
    this.updateTask.deadLine = this.formatDate(new Date(this.updateTask.deadLine));
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

  onCancel() {
    this.router.navigate([`organization/${this.organizationId}/tasks`]);
  }

  onToggleDone() {
    this.toggleDone.emit();
  }

  onDelete() {
    this.delete.emit();
  }
}

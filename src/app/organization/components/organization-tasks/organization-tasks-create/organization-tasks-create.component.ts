import { Component, Input } from '@angular/core';
import { TaskService } from '../../../service/task-service.service';
import { Task, CreateTask } from '../../../model/task';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-organization-tasks-create',
  templateUrl: './organization-tasks-create.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./organization-tasks-create.component.css']
})
export class OrganizationTasksCreateComponent {
  @Input() id?: string;

  newTask: CreateTask = {
    title: '',
    description: '',
    deadLine: '',
    isImportant: false,
    organization: 0
  };

  organizationId!: number;

  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.organizationId = params['organizationId'] || 1; // domyślna wartość !!!
      this.newTask.organization = this.organizationId;
    });
  }

  onSubmit(): void {
    this.newTask.deadLine = this.getFormattedDeadline(new Date(this.newTask.deadLine));

    if (this.newTask.title.trim() === '') {
      console.error('Title is required.');
      return;
    }

    this.taskService.createTask(this.newTask).subscribe(
      () => {
        console.log('Task created successfully.');
        this.router.navigate([`organization/${this.organizationId}/tasks`]);
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

  onCancel() {
    this.router.navigate([`organization/${this.organizationId}/tasks`]);
  }
}

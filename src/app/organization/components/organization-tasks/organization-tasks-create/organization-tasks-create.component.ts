import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../../../service/task-service.service';
import { CreateTask } from '../../../model/task';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from "@angular/forms";
import {NgIf} from "@angular/common";
import {ButtonsComponent} from "../../../../components/buttons/buttons.component";

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
      this.organizationId = params['organizationId'];
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

  onCancel() {
    this.router.navigate([`organization/${this.organizationId}/tasks`]);
  }
}

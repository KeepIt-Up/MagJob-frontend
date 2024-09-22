import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [CommonModule, MatButton, MatIcon, MatTooltip, MatIconButton, MatFabButton],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css'
})
export class ButtonsComponent {
  @Input() buttonType: string = '';
  @Input() buttonText?: string = '';
  @Input() permission?: boolean = false;
  @Input() disabled?: boolean = false;
  @Input() color?: string = 'grey';


  getButtonClass(color: string | undefined): string {
    switch (color) {
      case 'red':
        return 'btn btn-outline-danger';
      case 'yellow':
        return 'btn btn-outline-warning';
      case 'green':
        return 'btn btn-outline-success';
      case 'blue':
        return 'btn btn-outline-primary';
      case 'grey':
        return 'btn btn-outline-secondary';
      case 'cyan':
        return 'btn btn-outline-info';
      case 'black':
        return 'btn btn-outline-dark';
      case 'white':
        return 'btn btn-outline-light';
      default:
        return 'btn btn-outline-secondary';
    }
  }

}

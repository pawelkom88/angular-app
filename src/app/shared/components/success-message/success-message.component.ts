import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-success-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success-message.component.html',
  styleUrl: './success-message.component.css',
})
export class SuccessMessageComponent {
  @Input() successMessage = '';

  constructor() {}
}

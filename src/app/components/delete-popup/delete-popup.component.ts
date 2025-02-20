import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-popup.component.html',
  styleUrl: './delete-popup.component.scss',
})
export class DeletePopupComponent {
  isOpen = false;
  @Output() onDelete = new EventEmitter<void>();

  open(): void {
    this.isOpen = true;
  }

  close(): void {
    this.isOpen = false;
  }

  confirmDelete(): void {
    this.onDelete.emit();
    this.close();
  }
}

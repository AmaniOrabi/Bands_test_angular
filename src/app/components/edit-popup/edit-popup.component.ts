import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss',
})
export class EditPopupComponent {
  isOpen = false;
  @Input() bandToEdit: any;
  editedBand = {
    id: null,
    name: '',
    origin: '',
    city: '',
    startYear: '',
    separationYear: '',
    founders: '',
    members: '',
    musicalStyle: '',
    presentation: '',
  };

  @Output() onEditBand = new EventEmitter<any>();

  open(band: any): void {
    this.isOpen = true;
    if (band) {
      this.editedBand = { ...band };
    }
  }

  close(): void {
    this.isOpen = false;
    this.editedBand = {
      id: null,
      name: '',
      origin: '',
      city: '',
      startYear: '',
      separationYear: '',
      founders: '',
      members: '',
      musicalStyle: '',
      presentation: '',
    };
  }

  submitForm(): void {
    if (
      this.editedBand.name &&
      this.editedBand.origin &&
      this.editedBand.city &&
      this.editedBand.startYear &&
      this.editedBand.separationYear &&
      this.editedBand.founders &&
      this.editedBand.members &&
      this.editedBand.musicalStyle &&
      this.editedBand.presentation
    ) {
      this.onEditBand.emit(this.editedBand);
      this.close();
    }
  }
}

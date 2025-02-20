import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-popup.component.html',
  styleUrl: './add-popup.component.scss',
})
export class AddPopupComponent {
  isOpen = false;
  newBand = {
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

  @Output() onAddBand = new EventEmitter<any>();

  open(): void {
    this.isOpen = true;
  }

  close(): void {
    this.isOpen = false;
    this.newBand = {
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
      this.newBand.name &&
      this.newBand.origin &&
      this.newBand.city &&
      this.newBand.startYear &&
      this.newBand.separationYear &&
      this.newBand.founders &&
      this.newBand.members &&
      this.newBand.musicalStyle &&
      this.newBand.presentation
    ) {
      this.onAddBand.emit(this.newBand);
      this.close();
    }
  }
}

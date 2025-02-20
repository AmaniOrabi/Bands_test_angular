import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BandService } from '../../services/band.service';
import { DeletePopupComponent } from '../../components/delete-popup/delete-popup.component';
import { AddPopupComponent } from '../../components/add-popup/add-popup.component';
import { EditPopupComponent } from '../../components/edit-popup/edit-popup.component';

@Component({
  selector: 'app-band-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DeletePopupComponent,
    AddPopupComponent,
    EditPopupComponent,
  ],
  templateUrl: './band-list.component.html',
  styleUrl: './band-list.component.scss',
})
export class BandListComponent implements OnInit {
  @ViewChild(DeletePopupComponent) deletePopup:
    | DeletePopupComponent
    | undefined;
  @ViewChild(AddPopupComponent) addPopup: AddPopupComponent | undefined;
  @ViewChild(EditPopupComponent) editPopup: EditPopupComponent | undefined;

  bands: any[] = [];
  deleteId: number | null = null;
  searchQuery = '';
  sortColumn: string | null = null;
  sortDirection: 'asc' | 'desc' | null = null;

  constructor(private bandService: BandService) {}

  ngOnInit(): void {
    this.fetchBands();
  }

  fetchBands(): void {
    this.bandService.getBands().subscribe(
      (data) => {
        this.bands = data;
      },
      (error) => {
        console.error('Error fetching bands:', error);
      }
    );
  }

  filterBands(): void {
    const query = this.searchQuery.toLowerCase();

    if (!query || query === '') {
      this.fetchBands();
    } else {
      this.bands = this.bands.filter((band) =>
        Object.values(band).some((value) =>
          String(value).toLowerCase().includes(query)
        )
      );
    }
  }

  deleteBand(id: number): void {
    this.bandService.deleteBand(id).subscribe(
      (response) => {
        console.log('Band deleted:', response);
        this.fetchBands();
      },
      (error) => {
        console.error('Error deleting band:', error);
      }
    );
  }
  openDeleteConfirmation(id: number): void {
    this.deleteId = id;

    if (this.deletePopup) {
      this.deletePopup.open();
    }
  }

  confirmDelete(): void {
    if (this.deleteId) {
      this.deleteBand(this.deleteId);
      this.deleteId = null;
      if (this.deletePopup) {
        this.deletePopup.close();
      }
    }
  }
  openAddPopup(): void {
    if (this.addPopup) {
      this.addPopup.open();
    }
  }
  addBand(band: any): void {
    this.bandService.createBand(band).subscribe(
      (response) => {
        console.log('Band added:', response);
        this.fetchBands();
      },
      (error) => {
        console.error('Error adding band:', error);
      }
    );
  }
  updateBand(updatedBand: any): void {
    this.bandService.updateBand(updatedBand).subscribe(
      (response) => {
        console.log('Band updated:', response);
        this.fetchBands();
      },
      (error) => {
        console.error('Error updating band:', error);
      }
    );
  }

  openEditPopup(band: any): void {
    if (this.editPopup) {
      this.editPopup.open(band);
    }
  }
}

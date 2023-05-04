import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SearchDialogComponent } from "../../search-dialog/search-dialog.component";

@Component({
  selector: 'search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {

  dialogIsOpen: boolean = false;

  constructor(
    private dialog: MatDialog,
  ) { }

  // open search modal with component SearchDialogComponent
  openSearchDialog(): void {
    if (!this.dialogIsOpen) {
      const openSearchDialog = this.dialog.open(SearchDialogComponent, {
        width: "600px",
        maxHeight: "75vh",
      });
      this.dialogIsOpen = true;

      // handle dialog dismissal
      openSearchDialog.afterClosed()
        .subscribe(res => {
          this.dialogIsOpen = false;
        });
    }
    else
      this.closeAllOpenDialog();
  }

  // CTRL + K click event listener
  @HostListener('window:keydown.control.k', ['$event']) search(event: KeyboardEvent) {
    event.preventDefault();
    return !this.dialogIsOpen ? this.openSearchDialog() : this.closeAllOpenDialog();
  }

  closeAllOpenDialog() {
    return this.dialog.closeAll();
  }

}

import { Component } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.css']
})
export class SearchDialogComponent {
  searchQuery: string = '';

  constructor(public dialogRef: MatDialogRef<SearchDialogComponent>) {}

  search() {
    this.dialogRef.close(this.searchQuery);
  }
}


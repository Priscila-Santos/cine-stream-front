import { Component } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.css']
})
export class SearchDialogComponent {
  searchQuery: string = ' ';

  constructor(public dialogRef: MatDialogRef<SearchDialogComponent>, private router: Router) {}

  onSearch() {
    this.dialogRef.close();
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search', this.searchQuery.trim()]);
    }
  }
}


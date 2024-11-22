import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-big-card',
  templateUrl: './big-card.component.html',
  styleUrls: ['./big-card.component.css']
})
export class BigCardComponent {
  @Input() title: string = '';
  @Input() photoCover: string = '';
  @Input() id: string = '0';

  currentIndex: number = 0;
  totalItems: number = 6;

  constructor(private router: Router) {}

  goToContent() {
    this.router.navigate(['content', this.id]);
  }

  previous() {
    this.currentIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.totalItems;
  }
}

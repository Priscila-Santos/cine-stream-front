import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from '@angular/router';

@Component({
  selector: 'app-big-card',
  templateUrl: './big-card.component.html',
  styleUrls: ['./big-card.component.css']
})
export class BigCardComponent implements OnInit {
  @Input() items: Data[] = [];

  currentIndex: number = 0;
  totalItems: number = 6;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.totalItems = Math.min(this.items.length, 6);
  }

  goToContent(): void {
    if (this.items[this.currentIndex]) {
      this.router.navigate(['content', this.items[this.currentIndex]['id']]);
    }
  }

  previous(): void {
    this.currentIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems;
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.totalItems;
  }

  getStars(rating: number): string[] {
    return Array(Math.round(rating)).fill('★');
  }
}



// import { Component, Input, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { Data } from '@angular/router';

// @Component({
//   selector: 'app-big-card',
//   templateUrl: './big-card.component.html',
//   styleUrls: ['./big-card.component.css']
// })
// export class BigCardComponent implements OnInit {
//   @Input() items: Data[] = [];

//   currentIndex: number = 0;
//   totalItems: number = 6;

//   constructor(private router: Router) {}

//   ngOnInit(): void {
//     this.totalItems = Math.min(this.items.length, 6);
//   }

//   goToContent(): void {
//     if (this.items[this.currentIndex]) {
//       this.router.navigate(['content', this.items[this.currentIndex]['id']]);
//     }
//   }

//   previous(): void {
//     this.currentIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems;
//   }

//   next(): void {
//     this.currentIndex = (this.currentIndex + 1) % this.totalItems;
//   }

//   getStars(rating: number): string[] {
//     return Array(Math.round(rating)).fill('★');
//   }
// }

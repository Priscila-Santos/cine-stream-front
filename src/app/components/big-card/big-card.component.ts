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

//   constructor(private router: Router) {}

//   ngOnInit(): void {
//     // Confirmando que items não está vazio
//     if (this.items.length > 0) {
//       // Confirmando se o total de items é coerente
//       this.currentIndex = Math.min(this.currentIndex, this.items.length - 1);
//     }
//   }

//   goToContent(): void {
//     if (this.items[this.currentIndex]) {
//       this.router.navigate(['content', this.items[this.currentIndex]['id']]);
//     } else {
//       console.error('Item não encontrado.');
//     }
//   }

//   previous(): void {
//     this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
//   }

//   next(): void {
//     this.currentIndex = (this.currentIndex + 1) % this.items.length;
//   }
// }



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
      this.totalItems = this.items.length;
  }

  goToContent() { 
    if (this.items[this.currentIndex]) { 
      this.router.navigate(['content', this.items[this.currentIndex]['id']]); 
    } 
  }

  previous() {
    this.currentIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.totalItems;
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { Data } from 'src/app/services/data.service';

@Component({
  selector: 'app-small-card',
  templateUrl: './small-card.component.html',
  styleUrls: ['./small-card.component.css']
})
export class SmallCardComponent {
  @Input() genre: string = '';
  @Input() articles: Data[] = [];


  currentIndex: number = 0;

  // constructor() {}

  ngOnInit(): void {
    console.log('Gêneros:', this.genre);
    console.log('Dados', this.articles);
  }

  previous() {
    this.currentIndex = (this.currentIndex - 1 + this.articles.length) % this.articles.length;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.articles.length;
  }
}

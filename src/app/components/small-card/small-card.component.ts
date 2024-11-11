import { Component, Input } from '@angular/core';
import { Article } from 'src/app/services/data.service';

@Component({
  selector: 'app-small-card',
  templateUrl: './small-card.component.html',
  styleUrls: ['./small-card.component.css']
})
export class SmallCardComponent {
  @Input() genre: string = '';
  @Input() articles: Article[] = [];

  currentIndex: number = 0;

  previous() {
    this.currentIndex = (this.currentIndex - 1 + this.articles.length) % this.articles.length;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.articles.length;
  }
}

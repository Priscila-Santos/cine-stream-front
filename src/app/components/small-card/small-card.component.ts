import { Component, Input, OnInit } from '@angular/core';
import { Data } from 'src/app/services/data.service';

@Component({
  selector: 'app-small-card',
  templateUrl: './small-card.component.html',
  styleUrls: ['./small-card.component.css']
})
export class SmallCardComponent implements OnInit {
  @Input() genre: string = '';
  @Input() data: Data[] = [];

  currentIndex: number = 0;

  ngOnInit(): void {
    console.log('Gênero:', this.genre);
    console.log('Dados:', this.data);
  }

  previous() {
    this.currentIndex = (this.currentIndex - 1 + this.data.length) % this.data.length;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.data.length;
  }
}


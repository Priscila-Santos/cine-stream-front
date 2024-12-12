import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, Data } from 'src/app/services/data.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  article: Data | undefined;

  constructor(private route: ActivatedRoute, private articleService: DataService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const type = this.route.snapshot.data['type'];

    if (id) {
      if (type === 'series') {
        this.articleService.getSeriesDataById(id).subscribe((article: Data) => {
          console.log('Série carregada:', article);
          this.article = article;
        });
      } else {
        this.articleService.getFilmesDataById(id).subscribe((article: Data) => {
          console.log('Filme carregado:', article);
          this.article = article;
        });
      }
    }
  }

  roundVoteAverage(voteAverage: number): number { return Math.round(voteAverage / 2); }
}

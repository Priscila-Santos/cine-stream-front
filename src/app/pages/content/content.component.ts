// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import {dataFake} from '../../data/dataFake'

// @Component({
//   selector: 'app-content',
//   templateUrl: './content.component.html',
//   styleUrls: ['./content.component.css']
// })
// export class ContentComponent implements OnInit {
// 	photoCover:string = ''
// 	contenttitle:string = ''
// 	contentDescription:string = 'Thor busca por paz, mas seus planos são interrompidos por Gorr, o Carniceiro dos Deuses, um assassino galáctico. Para combater esta ameaça, ele pede que Rei Valquíria, Korg e Jane Foster o ajudem.'
// 	private id:string | null = '0'

//   constructor(
// 		private route:ActivatedRoute
// 	) { }

//   ngOnInit(): void {
// 		this.route.paramMap.subscribe(value =>
// 			this.id = value.get('id')
// 			)

// 			this.setValuesToComponent(this.id)
//   }
// 	setValuesToComponent(id:string | null){
// 		const result = dataFake.filter(article => article.id == id)[0]

// 		this.contentDescription = result.description
// 		this.contenttitle = result.title
// 		this.photoCover = result.photoCover

// 	}

// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService, Article } from 'src/app/services/data.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  article: Article | undefined;

  constructor(private route: ActivatedRoute, private articleService: ArticleService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.articleService.getArticleById(id).subscribe((article: Article) => {
        this.article = article;
      });
    }
  }
}

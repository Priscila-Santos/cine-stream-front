import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SearchDialogComponent } from '../search-dialog/search-dialog.component';
import { AvatarService } from 'src/app/services/avatar.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
  avatarUrl: string | undefined;

  constructor(public dialog: MatDialog, private router: Router, private avatarService: AvatarService) {}

  ngOnInit(): void {
    this.updateAvatarUrl(); // Obter avatar atual
  }

  updateAvatarUrl(): void {
    this.avatarUrl = this.avatarService.getAvatar();
  }

  openSearchDialog(): void {
    const dialogRef = this.dialog.open(SearchDialogComponent, {
      width: '300px',
      position: { right: '10px', top: '60px' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['content', result]);
      }
    });
  }

  goToProfile(): void {
    this.router.navigate(['profile']).then(() => {
      this.updateAvatarUrl(); // Atualiza o avatar da página de perfil
    });
  }
}




// import { Component, OnInit } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { Router } from '@angular/router';
// import { SearchDialogComponent } from '../search-dialog/search-dialog.component';
// import { AvatarService } from 'src/app/services/avatar.service';

// @Component({
//   selector: 'app-menu-bar',
//   templateUrl: './menu-bar.component.html',
//   styleUrls: ['./menu-bar.component.css']
// })
// export class MenuBarComponent implements OnInit{
//   avatarUrl: string | undefined;

//   constructor(public dialog: MatDialog, private router: Router, private avatarService: AvatarService) {}

//   ngOnInit(): void {
//       this.updateAvatarUrl(); //Obter avatar atual
//   }

//   updateAvatarUrl(): void{
//     this.avatarUrl = this.avatarService.getAvatar();
//   }

  

//   openSearchDialog(): void {
//     const dialogRef = this.dialog.open(SearchDialogComponent, {
//       width: '300px',
//       position: { right: '10px', top: '60px' }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.router.navigate(['content', result]);
//       }
//     });
//   }

//   goToProfile(): void {
//     this.router.navigate(['profile']).then(() => {
//       this.updateAvatarUrl(); // Atualiza o avatar da pagina de perfil
//     });
//   }
// }

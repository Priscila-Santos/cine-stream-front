import { Component, OnInit } from '@angular/core';
import { AvatarService } from 'src/app/services/avatar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  avatars = [
    { url: 'assets/img/avatar.png', name: ' Avatar', selected: false },
    { url: 'assets/img/avatar1.png', name: 'Avatar 1', selected: false },
    { url: 'assets/img/avatar2.png', name: 'Avatar 2', selected: false },
    { url: 'assets/img/avatar3.png', name: 'Avatar 3', selected: false },
    { url: 'assets/img/avatar4.png', name: 'Avatar 4', selected: false }
  ];

  genres = [
    { name: 'Action', selected: false },
    { name: 'Comedy', selected: false },
    { name: 'Drama', selected: false },
    { name: 'Horror', selected: false },
    { name: 'Romance', selected: false },
    { name: 'Thriller', selected: false },
    { name: 'Sci-Fi', selected: false },
    { name: 'Fantasy', selected: false },
    { name: 'Documentary', selected: false },
    { name: 'Animation', selected: false }
  ];

  currentAvatar = this.avatars[0]; // Define um avatar padrão

  constructor(private avatarService: AvatarService) { }

  ngOnInit(): void {
    this.updateAvatarUrl();
    this.currentAvatar.url = this.avatarService.getAvatar();
    
  }

  updateAvatarUrl(): void { this.currentAvatar.url = this.avatarService.getAvatar(); }

  selectAvatar(avatar: any): void {
    this.avatars.forEach(a => a.selected = false);
    avatar.selected = true;
    this.currentAvatar = avatar; // Atualiza o avatar atual
    this.avatarService.setAvatar(avatar.url); // Atualiza o avatar no serviço
  }

  toggleGenre(genre: any): void {
    const selectedGenres = this.genres.filter(g => g.selected).length;

    if (genre.selected || selectedGenres < 4) {
      genre.selected = !genre.selected;
    }
  }
}

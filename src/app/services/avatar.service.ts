import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {
  private avatarUrl: string = 'assets/img/avatar.png'; // URL padrão do avatar

  constructor() { }

  getAvatar(): string {
    return this.avatarUrl;
  }

  setAvatar(url: string): void {
    this.avatarUrl = url;
  }
}

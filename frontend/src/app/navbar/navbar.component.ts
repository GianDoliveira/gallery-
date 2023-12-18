import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { PhotosComponent } from '../photos/photos.component';
import { AlbumComponent } from '../album/album.component';
import { BinComponent } from '../bin/bin.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    PhotosComponent,
    AlbumComponent,
    BinComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  activeLink: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.setActiveLink();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setActiveLink();
      });
  }

  setActive(link: string) {
    this.activeLink = link;
  }

  setActiveLink() {
    const currentRoute = this.router.url;

    if (currentRoute === '/') {
      this.activeLink = 'Fotos';
    } else if (currentRoute.startsWith('/album/')) {
      this.activeLink = 'Álbuns';
    } else if (currentRoute === '/bin') {
      this.activeLink = 'Lixeira';
    }
  }
}
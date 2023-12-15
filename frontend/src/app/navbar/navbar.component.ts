import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
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

  ngOnInit() {
    this.setActiveLink();
  }

  setActive(link: string) {
    this.activeLink = link;
  }

  setActiveLink() {
    const currentLocation = window.location.href;

    if (currentLocation.includes('/')) {
      this.activeLink = 'Fotos';
    } else if (currentLocation.includes('album/:id')) {
      this.activeLink = 'Álbuns';
    } else if (currentLocation.includes('bin')) {
      this.activeLink = 'Lixeira';
    }
  }
}

import { Routes } from "@angular/router";
import { PhotosComponent } from "./photos/photos.component";
import { AlbumComponent } from "./album/album.component";
import { BinComponent } from "./bin/bin.component";

const routeConfig: Routes = [
    {
        path: '',
        component: PhotosComponent,
        title: 'Galeria de Fotos'
    },
    {
        path: 'album/:id',
        component: AlbumComponent,
        title: 'Álbuns'
    },
    {
        path: 'bin',
        component: BinComponent,
        title: 'Lixeira'
    },

];

export default routeConfig;
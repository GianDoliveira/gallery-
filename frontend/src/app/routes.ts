import { Routes } from "@angular/router";
import { PhotosComponent } from "./photos/photos.component";
import { AlbumComponent } from "./album/album.component";
import { TrashComponent } from "./trash/trash.component";

const routeConfig: Routes = [
    {
        path: '',
        component: PhotosComponent,
        title: 'Galeria de Fotos'
    },
    {
        path: 'album',
        component: AlbumComponent,
        title: 'Álbuns'
    },
    {
        path: 'trash',
        component: TrashComponent,
        title: 'Lixeira'
    },

];

export default routeConfig;
import { Routes } from '@angular/router';

import { PhotosComponent } from "./photos/photos.component";
import { AlbumComponent } from "./album/album.component";
import { TrashComponent } from "./trash/trash.component";
import { FormsComponent } from "./forms/forms.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

export const routes: Routes = [
    {
        path: '',
        component: PhotosComponent,
        title: 'Galeria de Fotos'
    },
    { path: 'album/:id', component: AlbumComponent },
    {
        path: 'album',
        component: AlbumComponent,
        data: { title: 'Álbuns' }
    },
    {
        path: '',
        redirectTo: '/album',
        pathMatch: 'full'
    },
    {
        path: 'trash',
        component: TrashComponent,
        title: 'Lixeira'
    },
    {
        path: 'auth/register',
        component: FormsComponent,
        title: 'Tela de registro'
    },
    { path: '**', component: PageNotFoundComponent }
];

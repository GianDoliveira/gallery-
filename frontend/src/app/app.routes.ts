import { Routes } from '@angular/router';

import { PhotosComponent } from "./photos/photos.component";
import { AlbumComponent } from "./album/album.component";
import { FormsComponent } from "./forms/forms.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

export const routes: Routes = [
    { path: 'forms', component: FormsComponent },
    { path: 'fotos', component: PhotosComponent, canActivate: [authGuard] },
    { path: '', redirectTo: '/forms', pathMatch: 'full' },
    { path: 'albums', component: AlbumComponent, canActivate: [authGuard] },
    { path: '**', component: PageNotFoundComponent }
];

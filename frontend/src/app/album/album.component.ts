import { Component } from '@angular/core';
import { NG_ICON_DIRECTIVES, provideIcons } from '@ng-icons/core';
import { bootstrapJournalAlbum } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [NG_ICON_DIRECTIVES],
  providers: [provideIcons({bootstrapJournalAlbum})],
  templateUrl: './album.component.html',
  styleUrl: './album.component.css'
})
export class AlbumComponent {

}

import { Component } from '@angular/core';
import { NG_ICON_DIRECTIVES, provideIcons } from '@ng-icons/core';
import { bootstrapUpload } from '@ng-icons/bootstrap-icons';
import { bootstrapCloudUpload } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [NG_ICON_DIRECTIVES],
  providers: [provideIcons({bootstrapUpload, bootstrapCloudUpload})],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.css'
})
export class PhotosComponent {

}

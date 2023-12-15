import { Component, ElementRef, ViewChild } from '@angular/core';
import { NG_ICON_DIRECTIVES, provideIcons, provideNgIconsConfig } from '@ng-icons/core';
import { bootstrapGoogle } from '@ng-icons/bootstrap-icons';
import { bootstrapFacebook } from '@ng-icons/bootstrap-icons';
import { bootstrapTwitter } from '@ng-icons/bootstrap-icons';


@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [NG_ICON_DIRECTIVES],
  providers: [
    provideIcons({bootstrapGoogle, bootstrapFacebook, bootstrapTwitter})
  ],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent {
  @ViewChild('containerElement') containerElement!: ElementRef;

  register() {
    this.containerElement.nativeElement.classList.add('active');
  }
  login() {
    this.containerElement.nativeElement.classList.remove('active');
  }
}

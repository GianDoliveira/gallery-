import { Component, ElementRef, ViewChild } from '@angular/core';
import { NG_ICON_DIRECTIVES, provideIcons } from '@ng-icons/core';

import { bootstrapGoogle } from '@ng-icons/bootstrap-icons';
import { bootstrapFacebook } from '@ng-icons/bootstrap-icons';
import { bootstrapTwitter } from '@ng-icons/bootstrap-icons';

import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [NG_ICON_DIRECTIVES],
  providers: [
    provideIcons({bootstrapGoogle, bootstrapFacebook, bootstrapTwitter}),
    Router
  ],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent {
  @ViewChild('containerElement') containerElement!: ElementRef;
  
  btnRegister() {
    this.containerElement.nativeElement.classList.add('active');
  }
  btnLogin() {
    this.containerElement.nativeElement.classList.remove('active');
  }

  user: any = {
    username: '',
    email: '',
    password: '',
  }
  constructor(private userService: UserService, private router: Router) {}
  register() {
    this.userService.register({ username: this.user.username, email: this.user.email, password: this.user.password }).subscribe((response) => {
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      this.router.navigate(['/']);
    });
  }

  login() {
    this.userService.login({ email: this.user.email, password: this.user.password }).subscribe((response) => {
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      this.router.navigate(['/']);
    });
  }

    registerBtn() {
      this.userService
      .register(this.user)
      .subscribe(
        {
          next: (response) => {
            console.log(response)
          },
          error: (erro) => {
            console.log(erro)
          }
        }
      )
    }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../utils/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  username: string;
  email: string;
  password: string;

  constructor(private authService: AuthService, private router: Router) {
    this.username = '';
    this.email = '';
    this.password = '';
   }

   register() {
    this.authService.register(this.username, this.email, this.password).subscribe((response) => {
      console.log(response);
      this.router.navigate(['/login']);
    }, error => {
      if (error.error) {
        console.log(error.error);
      }
    });
   }
}

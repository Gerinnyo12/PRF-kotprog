import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../utils/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private authService: AuthService, private router: Router) {
    this.username = '';
    this.password = '';
   }

   login() {
    if (this.username == '' || this.password == '') {
      console.log('ures');
      return;
    }
    
    this.authService.login(this.username, this.password).subscribe((message) => {
      console.log(message);
      localStorage.setItem('user', this.username);
      this.router.navigate(['/pets']);
    }, error => {
      if (error.error) {
        console.log(error.error);
      }
    });
   }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user');
      this.authService.logout().subscribe((message) => {
        console.log(message);
      }, error => {
        if (error.error) {
          console.log(error.error);
        }
      });
    }
  }
}

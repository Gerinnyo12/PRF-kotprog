import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PetsService } from '../utils/pets.service';
import { Router } from '@angular/router';
import { AuthService } from '../utils/auth.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {

  pets: Array<any> = [];

  constructor(private petsService: PetsService, private router: Router) { }

  ngOnInit(): void {
    this.loadPets();
  }

  loadPets() {
    this.petsService.getAllPets().subscribe((response) => {
      this.pets = response as Array<any>;
    }, error => {
      if (error.error) {
        console.log(error.error);
      }
    });
  }

  deletePet(name: string) {
    console.log(name + " torlese")
    this.petsService.deletePet(name).subscribe((_) => {
      this.loadPets();
    });
  }

  logout() {
    this.router.navigateByUrl('/login');
  }
}

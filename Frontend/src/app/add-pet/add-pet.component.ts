import { Component } from '@angular/core';
import { PetsService } from '../utils/pets.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent {

  name: string | undefined;
  specie: string | undefined;
  age: string | undefined;
  height: string | undefined;
  picture: any;

  constructor(private petsService: PetsService, private router: Router) { }

  addPet() {
    this.petsService.addPet({
      name: this.name,
      specie: this.specie,
      age: this.age,
      height: this.height,
      picture: this.picture
    }).subscribe((response) => {
      console.log(response);
      this.router.navigate(['/pets']);
    }, error => {
      if (error.error) {
        console.log(error.error);
      }
    });
  }

  convertToBase64(file: any) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    const base64 = await this.convertToBase64(file);
    this.picture = base64;
  }
}

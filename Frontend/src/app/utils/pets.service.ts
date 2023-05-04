import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  constructor(private httpClient: HttpClient) { }

  getAllPets() {
    return this.httpClient.get(environment.server + '/pets', {
      responseType: 'json'
    });
  }

  getPet(name: string) {
    return this.httpClient.get(environment.server + '/pets/' + name, {
      responseType: 'json'
    });
  }

  addPet(pet: any) {
    return this.httpClient.post(environment.server + '/pets', pet, {
      responseType: 'json'
    });
  }

  deletePet(name: string) {
    return this.httpClient.delete(environment.server + '/pets/' + name);
  }
}

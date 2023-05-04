import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PetsService } from '../utils/pets.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.css']
})
export class PetDetailsComponent implements OnInit, OnDestroy {
  
  pet: any = null;
  paramSubscibtion: Subscription | undefined = undefined;

  constructor(private petsService: PetsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.paramSubscibtion = this.route.params.subscribe((params) => {
      this.petsService.getPet(params['name']).subscribe((response) => {
        this.pet = response as any;
      }, error => {
        if (error.error) {
          console.log(error.error);
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.paramSubscibtion!.unsubscribe();
  }
}

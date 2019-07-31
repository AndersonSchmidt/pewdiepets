import { Component, OnInit } from '@angular/core';
import { PetService } from '../pet.service';
import { Pet } from '../pet.model';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {

  pets: Pet[];
  petsCopy: Pet[];
  constructor(private petService: PetService) { }

  ngOnInit() {
    this.petService.getPets().subscribe((pets) => {
      this.pets = pets;
      this.petsCopy = pets;
    });

    this.petService.search.subscribe((name) => {
      this.pets = this.petsCopy.filter((pet) => {
        return pet.name.match(new RegExp(name, 'i'));
      });
    });
  }

}

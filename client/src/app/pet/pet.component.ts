import { Component, OnInit } from '@angular/core';
import { Pet } from '../pet.model';
import { PetService } from '../pet.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.css']
})
export class PetComponent implements OnInit {
  pet: Pet;

  constructor(private petService: PetService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.petService.getPet(this.route.snapshot.params.id).subscribe((pet) => {
      this.pet = pet;
    });
  }

}

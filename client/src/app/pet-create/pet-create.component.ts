import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PetService } from '../pet.service';
import { Pet } from '../pet.model';

@Component({
  selector: 'app-pet-create',
  templateUrl: './pet-create.component.html',
  styleUrls: ['./pet-create.component.css']
})
export class PetCreateComponent implements OnInit {
  image: File;

  constructor(private petService: PetService) { }

  ngOnInit() {
  }

  onFileChange(event) {
    this.image = event.target.files[0];
  }

  onSubmit(form: NgForm) {
    form.value.image = this.image;
    this.petService.addPet(form.value).subscribe();
    form.reset();
  }

}

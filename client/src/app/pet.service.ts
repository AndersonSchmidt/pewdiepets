import { Injectable } from '@angular/core';
import { Pet } from './pet.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  constructor(private http: HttpClient) { }

  search = new Subject<string>();

  getPet(id: number) {
    return this.http.get<Pet>('http://localhost:3000/api/pets/' + id);
  }

  getPets() {
    return this.http.get<Pet[]>('http://localhost:3000/api/pets');
  }

  addPet(pet: Pet) {
    const petData = new FormData();
    petData.append('name', pet.name);
    petData.append('description', pet.description);
    petData.append('funfact', pet.funfact);
    petData.append('birth', pet.birth);
    petData.append('death', pet.death);
    petData.append('status', pet.status);
    petData.append('image', pet.image);

    return this.http.post('http://localhost:3000/api/pets', petData);
  }
}

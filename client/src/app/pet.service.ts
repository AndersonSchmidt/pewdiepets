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

  getPet(id: string) {
    return this.http.get<Pet>('http://pewdiepets.us-east-2.elasticbeanstalk.com/api/pets/' + id);
  }

  getPets() {
    return this.http.get<Pet[]>('http://pewdiepets.us-east-2.elasticbeanstalk.com/api/pets');
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

    return this.http.post('http://pewdiepets.us-east-2.elasticbeanstalk.com/api/pets', petData);
  }
}

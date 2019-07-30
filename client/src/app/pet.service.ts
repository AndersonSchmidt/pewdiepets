import { Injectable } from '@angular/core';
import { Pet } from './pet.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  constructor(private http: HttpClient) { }

  getPet(id: number) {
    return this.http.get<Pet>('http://localhost:3000/api/pets/' + id);
  }

  getPets() {
    return this.http.get<Pet[]>('http://localhost:3000/api/pets');
  }
}

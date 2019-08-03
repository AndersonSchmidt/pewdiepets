import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetsComponent } from './pets/pets.component';
import { PetComponent } from './pet/pet.component';
import { PetCreateComponent } from './pet-create/pet-create.component';

const routes: Routes = [
  {path: '', component: PetsComponent},
  {path: 'pets/create', component: PetCreateComponent},
  {path: 'pets/:id', component: PetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}

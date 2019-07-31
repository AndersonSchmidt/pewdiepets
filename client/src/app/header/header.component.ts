import { Component, OnInit } from '@angular/core';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private petService: PetService) { }

  ngOnInit() {
  }

  onKeyUp(name: string) {
    this.petService.search.next(name);
  }

}

import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private userService:UserService, private router:Router){

  }

  logOut(){
    this.userService.logout()
    this.router.navigate(['/login'])
  }
}

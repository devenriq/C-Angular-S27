import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit{
  formLogin!:FormGroup

  constructor(private formBuilder:FormBuilder, private userService: UserService, private cookieService: CookieService, private router: Router){}

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      user:['', [Validators.required]],
      email: ['', [Validators.required]]
    })
  }

  onSubmit(){
    this.userService.login(this.formLogin.get('user')?.value, this.formLogin.get('email')?.value).subscribe((usuario)=>{
      console.log(usuario)
      if(usuario){
        this.router.navigate(['/home'])
      }else{
        console.log('usuario o contraseña incorrecta o no existe el usuario')
      }
    })
  }
}

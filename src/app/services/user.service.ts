import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable, Observer, tap } from 'rxjs';
import { User } from '../interfaces/user';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:string='https://jsonplaceholder.typicode.com/users/'

  constructor(private http:HttpClient){}

  getUserData(index:string):Observable<User>{
    return this.http.get<User>(`${this.url}${index}`)
  }

  getUsersData():Observable<User[]>{
    return this.http.get<User[]>(this.url)
  }

  getUsersByUsernameAndEmail(username:string, email:string):Observable<User | undefined>{
    return this.getUsersData().pipe(map(users=>{
      const user = users.find(user=>user.username === username && user.email === email)
      return user
    }))
  }

  login(username:string, password:string){
    return this.getUsersByUsernameAndEmail(username,password).pipe(tap(usuario =>{
      if(usuario){
        localStorage.setItem('user', JSON.stringify(usuario))
      }
    }))
  }

  logout(){
    localStorage.removeItem('user')
  }
}

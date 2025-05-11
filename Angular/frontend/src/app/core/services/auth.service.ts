import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LOGIN, SIGNUP } from '../graphql/mutatinos/auth.mutation';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly apollo : Apollo
  ) { }

  signUp(username : string, password: string) {
    console.log(username, password);
    return this.apollo.mutate({
      mutation: SIGNUP,
      variables: {
        username,
        password
      }});
  }


  logIn(username : string, password: string) {
    return this.apollo.mutate({
      mutation: LOGIN,
      variables: {
        username,
        password
      }});
  }
}


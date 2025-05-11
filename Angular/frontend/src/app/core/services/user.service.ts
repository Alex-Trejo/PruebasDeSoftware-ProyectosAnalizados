import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_USER, GET_USERS } from '../graphql/querys/user.query';
import {CREATE_USER, DELETE_USER, EDIT_USER} from '../graphql/mutatinos/user.mutation';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly apollo: Apollo
  ) { }

  getUsers(authToken : string) {
    return this.apollo.query({
      query: GET_USERS,
      context: {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }
    });
  }

  getUser(id : string, authToken : string) {
    return this.apollo.query({
      query: GET_USER,
      variables: {
        id
      },
      context: {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }
    });
  }

  deleteUser(id : string, authToken : string) {
    return this.apollo.mutate({
      mutation: DELETE_USER,
      variables: {
        id
      },
      context: {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }
    });
  }


  createUser(username : string, password : string, role : string, authToken : string) {
    return this.apollo.mutate({
      mutation: CREATE_USER,
      variables: {
        username,
        password,
        role
      },
      context: {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }
    });
  }

  editUser(id : string, username : string, password: string, role : string, authToken : string) {
    console.log(id, username, password, role, authToken);
    return this.apollo.mutate({
      mutation: EDIT_USER,
      variables: {
        id,
        username,
        role,
        password
      },
      context: {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }
    });
  }


}

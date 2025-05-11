import {gql} from 'apollo-angular';

export const GET_USERS = gql`
query GetUsers {
    getUsers {
        id
        username
        role
    }
}
`



export const GET_USER = gql`
query GetUser($id: ID!) {
    getUser(id: $id) {
        id
        username
        role
    }
}
`
;





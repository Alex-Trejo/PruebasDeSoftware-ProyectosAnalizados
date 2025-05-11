import {gql} from 'apollo-angular';

export const CREATE_USER = gql`
mutation CreateUser($username: String!, $password: String!, $role: String!) {
    createUser(username: $username, password: $password, role: $role) {
        id
        username
        role
    }
}
`


export const DELETE_USER = gql`
mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
}
`

export const EDIT_USER = gql`
mutation EditUser($id: ID!, $username: String, $password: String, $role: String) {
    editUser(id: $id, username: $username, password: $password, role: $role) {
        id
        username
        role
    }
}
`;


import { gql } from "apollo-angular";

export const SIGNUP = gql`
  mutation Register($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      token
      refreshToken
      message
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      refreshToken
      message
    }
  }
`

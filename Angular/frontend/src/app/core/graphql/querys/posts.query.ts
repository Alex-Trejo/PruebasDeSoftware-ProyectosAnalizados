import { gql } from "apollo-angular";

export const GET_ALL_PUBLIC_POSTS = gql`
query GetPublicPosts {
    getPublicPosts {
        id
        title
        content
        user {
            username
        }
    }
}
`


export const GET_MY_POSTS = gql`
query GetMyPosts {
    getMyPosts {
        id
        title
        content
        user {
            id
            username
            role
        }
    }
}
`


export const GET_POSTS = gql`
query GetPosts {
    getPosts {
        id
        title
        content
        user {
            id
            username
            role
        }
    }
}
`


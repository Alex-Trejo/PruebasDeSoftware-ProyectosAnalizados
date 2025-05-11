import { gql } from "apollo-angular";


export const CREATE_POST = gql`
mutation CreatePost($title: String!, $content: String!, $isPublic: Boolean!) {
    createPost(title: $title, content: $content, isPublic: $isPublic) {
        id
        title
        content
    }
}
`

/**mutation DeletePost {
    deletePost(postId: null)
}
 */

export const DELETE_POST = gql`
mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId)
}
`;

/*mutation EditUser {
    editUser(id: null) {
        id
        username
        role
    }
    editPost(postId: null, isPublic: null, title: null, content: null) {
        id
        title
        content
        user {
            id
            username
            role
        }
    }
}*/

export const EDIT_POST = gql`
mutation EditPost($postId: ID!, $title: String!, $content: String!, $isPublic: Boolean!) {
    editPost(postId: $postId, title: $title, content: $content, isPublic: $isPublic) {
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
`;
import { gql } from "@apollo/client";

const GET_POSTS = gql`
    query {
        posts {
            id
            imagePost
            user {
              name
              imageUser
            }
            createdAt
            contentPost
            likes {
              id
              user {
                id
              }
            }
            comments {
              id
              contentCmt
              likes {
                id
                user {
                  id
                }
              }
              post {
                id
              }
              user {
                name
                imageUser
              }
            }
          }
    }
`;

const GET_POST_DETAIL = gql`
    query  getPostDetail($id: ID!) {
        post(id: $id) {
            id
            imagePost
            user {
              name
            }
            createdAt
            contentPost
            likes {
              id
              user {
                id
              }
            }
            comments {
              id
              contentCmt
              createdAt
              likes {
                id
                user {
                  id
                }
              }
              post {
                createdAt
                id
              }
              user {
                name
                imageUser
              }
            }
          }
    }
`;



const CREATE_POST = gql`
    mutation createPost($userId: ID!, $contentPost: String!) {
      createPost(userId: $userId, contentPost: $contentPost) {
        contentPost
        imagePost
        comments {
          contentCmt
        }
        likes {
          id
          user {
            id
          }
        }
      }
    }
`;

const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId) {
      id
    }
  }
`;

const UPDATE_POST = gql`
  mutation updatePost($postId: ID!, $contentPost: String!) {
    updatePost(postId: $postId, contentPost: $contentPost) {
      id
    }
  }
`;


export { GET_POSTS, GET_POST_DETAIL, CREATE_POST, DELETE_POST, UPDATE_POST };
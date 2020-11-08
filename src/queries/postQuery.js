import { gql } from "@apollo/client";

const GET_POSTS = gql`
    query getPosts($skip: Int!, $limit: Int!) {
        posts(skip: $skip, limit: $limit) {
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
              createdAt
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
            bookmarks {
              id
              user {
                id
              }
            }
          }
    }
`;

const GET_USER_POSTS = gql`
    query getUserPosts($username: String!, $skip: Int!, $limit: Int!) {
        userPosts(username: $username, skip: $skip, limit: $limit) {
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
              createdAt
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
            bookmarks {
              id
              user {
                id
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
            bookmarks {
              id
              user {
                id
              }
            }
          } 
    }
`;



const CREATE_POST = gql`
    mutation createPost($username: String!, $contentPost: String!, $imagePost: String!) {
      createPost(username: $username, contentPost: $contentPost, imagePost: $imagePost) {
        id
        contentPost
        imagePost
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

const GET_SAVED_POSTS = gql`
  query getSavedPosts($userId: ID!, $skip: Int!, $limit: Int!) {
      savedPosts(userId: $userId, skip: $skip, limit: $limit) {
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
            createdAt
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
          bookmarks {
            id
            user {
              id
          }
        }
    }
}
`;

export { GET_POSTS,
   GET_USER_POSTS,
   GET_POST_DETAIL,
   CREATE_POST, 
   DELETE_POST, 
   UPDATE_POST,
   GET_SAVED_POSTS  
};
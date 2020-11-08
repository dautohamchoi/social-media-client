import { gql } from "@apollo/client";

const LOGIN_USER = gql`
    mutation userLogin($email: String!, $password: String!) {
        userLogin(email: $email, password: $password) {
            id
            name
            email
            token
            imageUser
        }
    }
`;

const REGISTER_USER = gql`
    mutation userRegister($email: String!, $name: String!, $password: String!) {
        userRegister(email: $email, name: $name, password: $password) {
            id
            name
            email
        }
    }
`;

// const GET_USER_POSTS = gql`
//     query getUserPosts($name: String!, $skip: Int!, $limit: Int!) {
//         user(name: $name) {
//             posts(skip: $skip, limit: $limit) {
//               id
//               contentPost
//               imagePost
//               createdAt
//               user {
//                 name
//                 imageUser
//               }
//               likes{
//                 id
//                 user{
//                   id
//                 }
//               }
//               bookmarks{
//                 id
//                 user{
//                   id
//                 }
//               }
//               comments{
//                 id
//                 contentCmt
//                 createdAt
//                 user{
//                   name
//                   imageUser
//                 }
//                 post{
//                   id        
//                 }
//                 likes{
//                   id
//                   user{
//                     id
//                   }
//                 }
//               }
//             }
                     
//         }

//     }
// `;

const GET_USER_INFO = gql`
    query getUserInfo($name: String!) {
        user(name: $name) {
            id  
            name
            nickname
            imageUser
            email
            bookmarks {
              id
              user {
                id
              }
            }
            status
            followingPeople {
              id
              userId
              follower {
                name
                imageUser
                nickname
              }
            }
            followers {
              id
              userId
              followerName
              user {
                name
                imageUser
                nickname
              }
            } 
            posts {
              id
            }       
        }
    }
`;


const USER_UPDATE_DETAIL = gql`
    mutation userUpdateDetail($id: ID!, $nickname: String!, $status: String!) {
        userUpdateDetail(id: $id, nickname: $nickname, status: $status) {
            id
            nickname
            status
        }
    }
`;

const GET_USER_BOOKMARK = gql`
    query getUserBookmark($name: String!) {
        user(name: $name) {
            id  
            name
            nickname
            imageUser
            email
            posts {
              id
            }
            bookmarks {
              id
              user {
                id
              }
              post {
                id
                contentPost
                imagePost
                createdAt
                user {
                  name
                  imageUser
                }
                likes{
                  id
                  user{
                    id
                  }
                }
                bookmarks{
                  id
                  user{
                    id
                  }
                }
                comments{
                  id
                  contentCmt
                  createdAt
                  user{
                    name
                    imageUser
                  }
                  post{
                    id        
                  }
                  likes{
                    id
                    user{
                      id
                    }
                  }
                }  
              }
            }
            followingPeople {
              id
              userId
              follower {
                name
                imageUser
                nickname
              }
            }
            followers {
              id
              userId
              followerName
              user {
                name
                imageUser
                nickname
              }
            }
            status
                     
        }

    }
`;

const GET_MY_FOLLOWING_PEOPLE = gql`
  query getMyFollowingPeople($name: String!) {
    user(name: $name) {
      followingPeople {
        id
        follower {
          name
        }
      }
    }
  }  
`;

const GET_RECOMMENDED_USERS = gql`
  query getRecommendedUsers($userId: ID!) {
    recommendedUsers(userId: $userId) {
      id
      name
      nickname
      imageUser
    }
  }  
`;

const SEARCHING_USERS = gql`
  mutation searchingUsers($keyword: String!) {
    searchingUsers(keyword: $keyword) {
      id
      name
      nickname
      imageUser
    }
  }  
`;



export { LOGIN_USER, 
  REGISTER_USER,
  USER_UPDATE_DETAIL, 
  GET_USER_BOOKMARK,
  GET_USER_INFO,
  GET_MY_FOLLOWING_PEOPLE,
  GET_RECOMMENDED_USERS,
  SEARCHING_USERS,
};
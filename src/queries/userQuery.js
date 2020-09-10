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

const GET_USER_DETAIL = gql`
    query getUserDetail($name: String!) {
        user(name: $name) {
            id  
            name
            nickname
            imageUser
            email
            followers {
              name
              imageUser
            }
            followingPeople{
              name
              imageUser
            }
            status
            posts{
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



export { LOGIN_USER, GET_USER_DETAIL, USER_UPDATE_DETAIL };
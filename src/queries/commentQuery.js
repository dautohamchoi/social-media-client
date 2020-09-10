import { gql } from "@apollo/client";

const CREATE_COMMENT = gql`
    mutation createComment($userId: ID!, $postId: ID!, $contentCmt: String!) {
      createComment(userId: $userId, postId: $postId, contentCmt: $contentCmt) {
        contentCmt
        likes {
          user {
            name
          }
        }
        user {
          name
          imageUser
        }
      }
    }
`;

const DELETE_COMMENT = gql`
  mutation deleteComment($cmtId: ID!) {
    deleteComment(cmtId: $cmtId) {
      id
    }
  }
`;

const UPDATE_COMMENT = gql`
  mutation updateComment($cmtId: ID!, $contentCmt: String!) {
    updateComment(cmtId: $cmtId, contentCmt: $contentCmt) {
      id
    }
  }
`;

export { CREATE_COMMENT, DELETE_COMMENT, UPDATE_COMMENT };
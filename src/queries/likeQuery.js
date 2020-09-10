const { gql } = require("@apollo/client");

const ADD_LIKE = gql`
    mutation addLike($postId: ID!, $userId: ID!) {
        addLike(postId: $postId, userId: $userId) {
            id
            user {
                id
            }
        }
    }
`;

const REMOVE_LIKE = gql`
    mutation removeLike($likeId: ID!) {
        removeLike(likeId: $likeId) {
            id
        }
    }
`;

export { ADD_LIKE, REMOVE_LIKE };

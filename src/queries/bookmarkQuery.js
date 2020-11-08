const { gql } = require("@apollo/client");

const ADD_BOOKMARK = gql`
    mutation addBookmark($postId: ID!, $userId: ID!) {
        addBookmark(postId: $postId, userId: $userId) {
            id
            user {
                id
            }
        }
    }
`;

const REMOVE_BOOKMARK = gql`
    mutation removeBookmark($bookmarkId: ID!) {
        removeBookmark(bookmarkId: $bookmarkId) {
            id
        }
    }
`;

export { ADD_BOOKMARK, REMOVE_BOOKMARK };

const { gql } = require("@apollo/client");

const ADD_FOLLOWER = gql`
    mutation addFollower($userId: ID!, $followerName: String!) {
        addFollower(userId: $userId, followerName: $followerName) {
            id
            followerName
        }
    }
`;

const REMOVE_FOLLOWER = gql`
    mutation removeFollower($followId: ID!) {
        removeFollower(followId: $followId) {
            id
        }
    }
`;

export { ADD_FOLLOWER, REMOVE_FOLLOWER };

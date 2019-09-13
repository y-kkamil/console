import gql from 'graphql-tag';

export const GET_NOTIFICATION = gql`
  query GetNotification {
    notification {
      title
      content
      color
      icon
      visible
    }
  }
`;

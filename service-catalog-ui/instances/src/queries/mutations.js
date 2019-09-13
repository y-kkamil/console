import { gql } from 'apollo-boost';

const deleteServiceInstance = gql`
  mutation DeleteServiceInstance($name: String!, $namespace: String!) {
    deleteServiceInstance(name: $name, namespace: $namespace) {
      name
    }
  }
`;

export { deleteServiceInstance };

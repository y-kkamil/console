import gql from 'graphql-tag';

export const FILTER_INSTANCES_MUTATION = gql`
  mutation filterItems {
    filterItems
  }
`;

export const SET_ACTIVE_FILTERS_MUTATION = gql`
  mutation setActiveFilters($key: String!, $value: String) {
    setActiveFilters(key: $key, value: $value)
  }
`;

export const SERVICE_INSTANCES_DELETE_MUTATION = gql`
  mutation DeleteServiceInstance($name: String!, $namespace: String!) {
    deleteServiceInstance(name: $name, namespace: $namespace) {
      name
    }
  }
`;

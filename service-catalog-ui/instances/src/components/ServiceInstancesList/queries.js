import gql from 'graphql-tag';
import { SERVICE_INSTANCE_DETAILS_FRAGMENT } from '../DataProvider/fragments';

export const ACTIVE_FILTERS_QUERY = gql`
  query activeFilters {
    activeFilters {
      search
      labels
      local
    }
  }
`;

export const ALL_FILTERS_QUERY = gql`
  query allFilters {
    allFilters {
      name
      values {
        name
        value
        count
      }
    }
  }
`;

export const FILTERED_INSTANCES_COUNTS_QUERY = gql`
  query filteredInstancesCounts {
    filteredInstancesCounts {
      local
      notLocal
    }
  }
`;

export const ALL_ITEMS_QUERY = gql`
  query allItems($namespace: String!) {
    serviceInstances(namespace: $namespace) {
      ...serviceInstanceDetails
    }
  }
  ${SERVICE_INSTANCE_DETAILS_FRAGMENT}
`;

export const FILTERED_ITEMS_QUERY = gql`
  query filteredItems {
    filteredItems {
      name
    }
  }
  ${SERVICE_INSTANCE_DETAILS_FRAGMENT}
`;

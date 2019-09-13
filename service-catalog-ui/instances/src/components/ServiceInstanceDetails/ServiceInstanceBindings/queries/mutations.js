import { gql } from 'apollo-boost';

const createBinding = gql`
  mutation CreateServiceBinding(
    $serviceInstanceName: String!
    $namespace: String!
    $parameters: JSON
  ) {
    createServiceBinding(
      serviceInstanceName: $serviceInstanceName
      namespace: $namespace
      parameters: $parameters
    ) {
      name
    }
  }
`;

const createBindingUsage = gql`
  mutation CreateServiceBindingUsage(
    $namespace: String!
    $createServiceBindingUsageInput: CreateServiceBindingUsageInput
  ) {
    createServiceBindingUsage(
      namespace: $namespace
      createServiceBindingUsageInput: $createServiceBindingUsageInput
    ) {
      name
    }
  }
`;

export { createBinding, createBindingUsage };

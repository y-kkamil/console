import { gql } from 'apollo-boost';
import {
  SERVICE_BINDING_DETAILS_FRAGMENT,
  SERVICE_BINDING_USAGE_DETAILS_FRAGMENT,
  serviceClassGql,
  servicePlanGql,
} from '../components/DataProvider/fragments';

const docsTopic = `
  name
  groupName
  displayName
  description
  assets {
      name
      metadata
      type
      files {
        url
        metadata
      }
  }
`;

const getServiceInstanceDetails = gql`
  query($name: String!, $namespace: String!) {
    serviceInstance(name: $name, namespace: $namespace) {
      name
      bindable
      clusterServiceClass {
        description
        displayName
        name
        documentationUrl
        supportUrl
        labels
        clusterDocsTopic {
          name
          groupName
          displayName
          description
          assets {
            name
            metadata
            type
            files {
              url
              metadata
            }
          }
        }
      }
      serviceClass {
        description
        name
        displayName
        documentationUrl
        supportUrl
        labels
        clusterDocsTopic {
          name
          groupName
          displayName
          description
          assets {
            name
            metadata
            type
            files {
              url
              metadata
            }
          }
        }
        docsTopic {
          name
          groupName
          displayName
          description
          assets {
            name
            metadata
            type
            files {
              url
              metadata
            }
          }
        }
      }
      clusterServicePlan {
        displayName
        externalName
        name
      }
      servicePlan {
        displayName
        externalName
        name
        bindingCreateParameterSchema
      }
      planSpec
      status {
        type
        message
      }
      serviceBindings {
        items {
          name
          namespace
          parameters
          secret {
            name
            data
            namespace
          }
          serviceInstanceName
          status {
            type
            reason
            message
          }
        }
        stats {
          ready
          failed
          pending
          unknown
        }
      }
      serviceBindingUsages {
        name
        namespace
        serviceBinding {
          name
          serviceInstanceName
          secret {
            name
            data
          }
        }
        status {
          type
          reason
          message
        }
        usedBy {
          name
          kind
        }
        parameters {
          envPrefix {
            name
          }
        }
      }
    }
  }
`;

const SERVICE_INSTANCE_DETAILS_FRAGMENT = gql`
  fragment serviceInstanceDetails on ServiceInstance {
      name
      namespace
      planSpec
      labels
      bindable
      status {
        type
        message
      }
      serviceClass {
        ${serviceClassGql}
        namespace
        docsTopic{
          ${docsTopic}
        }
        clusterDocsTopic {
          ${docsTopic}
        }
      }
      clusterServiceClass {
        ${serviceClassGql}
        clusterDocsTopic {
          ${docsTopic}
        }
      }
      servicePlan {
        ${servicePlanGql}
        namespace
        relatedServiceClassName
      }
      clusterServicePlan {
        ${servicePlanGql}
        relatedClusterServiceClassName
      }
      serviceBindings {
        items {
            ...serviceBindingDetails
        }
        stats {
          ready
          failed
          pending
          unknown
        }
      }
      serviceBindingUsages {
        ...serviceBindingUsageDetails
      }
  }
  ${SERVICE_BINDING_DETAILS_FRAGMENT}
  ${SERVICE_BINDING_USAGE_DETAILS_FRAGMENT}
`;

const getAllServiceInstances = gql`
  query ServiceInstances($namespace: String!) {
    serviceInstances(namespace: $namespace) {
      ...serviceInstanceDetails
    }
  }
  ${SERVICE_INSTANCE_DETAILS_FRAGMENT}
`;

export { getAllServiceInstances, getServiceInstanceDetails };

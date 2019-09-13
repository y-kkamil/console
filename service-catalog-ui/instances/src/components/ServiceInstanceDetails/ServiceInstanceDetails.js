import React from 'react';

import { useQuery } from '@apollo/react-hooks';

import {
  NotificationMessage,
  Spinner,
  ThemeWrapper,
} from '@kyma-project/react-components';

import ServiceInstanceHeader from './ServiceInstanceHeader/ServiceInstanceHeader.component';
import ServiceInstanceTabs from './ServiceInstanceTabs/ServiceInstanceTabs.component';
import ServiceInstanceBindings from './ServiceInstanceBindings/ServiceInstanceBindings.container';

import { serviceInstanceConstants } from './../../variables';

import { ServiceInstanceWrapper, EmptyList } from './styled';
import { transformDataScalarStringsToObjects } from '../../store/transformers';
import { backendModuleExists } from '../../commons/helpers';
import builder from '../../commons/builder';
import { getServiceInstanceDetails } from '../../queries/queries';

// class ServiceInstanceDetails extends React.Component {
//   state = { defaultActiveTabIndex: 0 };
//
//   callback = data => {
//     this.setState({ ...data });
//   };
//
//   render() {
//     const { serviceInstance = {}, deleteServiceInstance, history } = this.props;
//
//     if (serviceInstance && serviceInstance.loading) {
//       return (
//         <EmptyList>
//           <Spinner />
//         </EmptyList>
//       );
//     }
//
//     const instance =
//       serviceInstance &&
//       transformDataScalarStringsToObjects(serviceInstance.serviceInstance);
//     const serviceClass =
//       instance && (instance.serviceClass || instance.clusterServiceClass);
//
//     if (!serviceInstance.loading && !instance) {
//       return (
//         <EmptyList>{serviceInstanceConstants.instanceNotExists}</EmptyList>
//       );
//     }
//
//     return (
//       <ThemeWrapper>
//         <ServiceInstanceHeader
//           serviceInstance={instance}
//           deleteServiceInstance={deleteServiceInstance}
//           history={history}
//         />
//         <ServiceInstanceWrapper>
//           <ServiceInstanceBindings
//             defaultActiveTabIndex={this.state.defaultActiveTabIndex}
//             callback={this.callback}
//             serviceInstance={instance}
//           />
//           {serviceClass &&
//           backendModuleExists('cms') &&
//           backendModuleExists('assetstore') ? (
//             <ServiceInstanceTabs serviceClass={serviceClass} />
//           ) : null}
//         </ServiceInstanceWrapper>
//
//         <NotificationMessage
//           type="error"
//           title={serviceInstanceConstants.error}
//           message={serviceInstance.error && serviceInstance.error.message}
//         />
//       </ThemeWrapper>
//     );
//   }
// }

function callback() {}

export default function ServiceInstanceDetails({ match }) {
  const { loading, error, data } = useQuery(getServiceInstanceDetails, {
    variables: {
      namespace: builder.getCurrentEnvironmentId(),
      name: match.params.name,
    },
  });

  if (loading)
    return (
      <EmptyList>
        <Spinner />
      </EmptyList>
    );
  if (error) return <p>Error :(</p>;

  const serviceInstance = data.serviceInstance;

  const serviceClass =
    serviceInstance &&
    (serviceInstance.serviceClass || serviceInstance.clusterServiceClass);

  return (
    <ThemeWrapper>
      <ServiceInstanceHeader
        serviceInstance={serviceInstance}
        deleteServiceInstance={null}
        history={[]}
      />
      <ServiceInstanceWrapper>
        <ServiceInstanceBindings
          defaultActiveTabIndex={0}
          callback={callback}
          serviceInstance={serviceInstance}
        />
        {serviceClass &&
        backendModuleExists('cms') &&
        backendModuleExists('assetstore') ? (
          <ServiceInstanceTabs serviceClass={serviceClass} />
        ) : null}
      </ServiceInstanceWrapper>
      <NotificationMessage
        type="error"
        title={serviceInstanceConstants.error}
        message={error && error.message}
      />
    </ThemeWrapper>
  );
}

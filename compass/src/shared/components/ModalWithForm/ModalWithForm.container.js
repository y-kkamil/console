import { graphql, compose } from 'react-apollo';

import { SEND_NOTIFICATION } from '../../../gql';

import ModalWithForm from '@kyma-project/react-components';

const ModalWithFormContainer = ({ sendNotificationQuery }) =>
  compose(
    graphql(sendNotificationQuery, {
      name: 'sendNotification',
    }),
  )(ModalWithForm);
export default ModalWithFormContainer;

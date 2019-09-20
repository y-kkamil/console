import React from 'react';
import { Button } from '../react-components/components/Button';
import { useNotification } from 'contexts/notifications';

export default function HelloKyma() {
  const { notify } = useNotification();
  return (
    <div>
      <h3>Hello Kyma!</h3>
      <p>
        <Button onClick={() => notify('Hello one again!')}>Click me</Button>
      </p>
    </div>
  );
}

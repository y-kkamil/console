import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_NAMESPACES } from '../../queries/queries';
import { Spinner, ModalWithForm } from '@kyma-project/react-components';
import CreateNamespaceForm from '../CreateNamespaceForm/CreateNamespaceForm';

export default function NamespaceList() {
  const { data, error, loading } = useQuery(GET_NAMESPACES);

  if (error) {
    return <p>Nie pykło</p>;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <ModalWithForm
        title="Create new runtime"
        button={{ text: 'Create runtime', glyph: 'add' }}
      ></ModalWithForm>

      {data.namespaces.map(namespace => (
        <p key={namespace.name}>{namespace.name}</p>
      ))}
    </>
  );
}

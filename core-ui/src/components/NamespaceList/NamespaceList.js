import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import './NamespaceList.scss';
import { GET_NAMESPACES } from '../../queries/queries';
import { Spinner } from '@kyma-project/react-components';
import { ModalWithForm } from '@kyma-project/components';
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
        title="Add new namespace"
        button={{ text: 'Add new namespace', glyph: 'add' }}
        id="add-namespace-modal"
      >
        <CreateNamespaceForm />
      </ModalWithForm>

      {data.namespaces.map(namespace => (
        <p key={namespace.name}>{namespace.name}</p>
      ))}
    </>
  );
}

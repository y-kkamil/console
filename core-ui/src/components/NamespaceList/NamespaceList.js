import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_NAMESPACES } from '../../queries/queries';
import { Spinner } from '@kyma-project/react-components';
import CreateNamespaceModal from '../CreateNamespaceModal/CreateNamespaceModal';

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
      <CreateNamespaceModal />

      {data.namespaces.map(namespace => (
        <p key={namespace.name}>{namespace.name}</p>
      ))}
    </>
  );
}

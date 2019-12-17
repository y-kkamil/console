import React from 'react';
import { MockedProvider, wait } from '@apollo/react-testing';
import { mount } from 'enzyme';
import { validMock, errorMock } from './mock';
import { Modal } from 'fundamental-react';
import { act } from 'react-dom/test-utils';
import { render, fireEvent, queryByLabelText } from '@testing-library/react';

import ConnectApplicationModal from '../ConnectApplicationModal.container';

describe('ConnectApplicationModal Container', () => {
  //for "Warning: componentWillReceiveProps has been renamed"
  console.warn = jest.fn();

  afterEach(() => {
    console.warn.mockReset();
  });

  afterAll(() => {
    if (console.warn.mock.calls.length) {
      expect(console.warn.mock.calls[0][0]).toMatchSnapshot();
    }
  });

  const openModal = async getByRoleFn => {
    const modalOpeningButton = getByRoleFn('button'); //get the only button around
    expect(modalOpeningButton.textContent).toBe('Connect Application'); // make sure this is the right one
    modalOpeningButton.click();
  };

  it('Modal is initially closed and opens after button click', async () => {
    const { queryByLabelText, getByRole, unmount } = render(
      <MockedProvider addTypename={false} mocks={validMock}>
        <ConnectApplicationModal applicationId="app-id" />
      </MockedProvider>,
    );

    expect(queryByLabelText('Connect Application')).not.toBeInTheDocument();
    await openModal(getByRole);

    expect(queryByLabelText('Connect Application')).toBeInTheDocument();

    unmount();
  });

  it('Modal is in "loading" state after open', async () => {
    const { queryAllByRole, getByRole, unmount } = render(
      <MockedProvider addTypename={false} mocks={validMock}>
        <ConnectApplicationModal applicationId="app-id" />
      </MockedProvider>,
    );
    //await wait(0);
    await openModal(getByRole);

    const loadings = queryAllByRole('textbox');
    expect(loadings).toHaveLength(2);

    expect(loadings[0].value).toBe('Loading...');
    expect(loadings[1].value).toBe('Loading...');
    unmount();
  });
});

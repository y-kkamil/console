import React, { useState } from 'react';
import { Modal } from 'fundamental-react/Modal';
import { Button } from '@kyma-project/react-components';
import * as LuigiClient from '@kyma-project/luigi-client';

const CreateNamespaceModal = () => {
  const [isShown, setIsShown] = useState(false);

  function handleModalOpen(isShown) {
    if (isShown) {
      LuigiClient.uxManager().addBackdrop();
    } else {
      LuigiClient.uxManager().removeBackdrop();
    }
    setIsShown(isShown);
  }

  return (
    <>
      <Button glyph={'add'} onClick={() => handleModalOpen(true)}>
        Add new namespace
      </Button>

      <Modal
        actions={
          <>
            <Button onClick={() => handleModalOpen(false)} type="standard">
              Cancel
            </Button>
            <Button onClick={function C() {}}>Add</Button>
          </>
        }
        onClose={() => handleModalOpen(false)}
        title="Add new namespace"
        show={isShown}
      >
        <div className="fd-form__group">
          <div className="fd-form__item">
            <label className="fd-form__label is-required">Email</label>
            <input
              className="fd-form__control"
              onChange={function C() {}}
              type="text"
              value=""
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreateNamespaceModal;

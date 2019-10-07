import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'fundamental-react';
import LuigiClient from '@kyma-project/luigi-client';
import { useNotification } from '../../contexts/notifications';

//TODO: move this component to a shared "place"

const ModalWithForm = ({
  performRefetch,
  title,
  button,
  renderForm,
  ...props
}) => {
  const [isOpen, setOpen] = useState(false);
  const [isValid, setValid] = useState(false);
  const formElementRef = useRef(null);
  const notificationManager = useNotification();

  const setOpenStatus = status => {
    if (status) {
      LuigiClient.uxManager().addBackdrop();
    } else {
      LuigiClient.uxManager().removeBackdrop();
    }
    setOpen(status);
  };

  const handleFormChanged = e => {
    setValid(formElementRef.current.checkValidity());
    if (typeof e.target.reportValidity === 'function') {
      // for IE
      e.target.reportValidity();
    }
  };

  const handleFormError = (title, message, isWarning) => {
    notificationManager.notify({
      content: message,
      title: title,
      color: isWarning ? '#E9730C' : '#BB0000',
      icon: 'decline',
      autoClose: false,
    });
  };
  const handleFormSuccess = (title, message) => {
    notificationManager.notify({
      content: message,
      title: title,
      color: '#107E3E',
      icon: 'accept',
      autoClose: true,
    });

    performRefetch();
  };
  return (
    <div>
      <Button
        glyph={button.glyph || null}
        onClick={() => {
          setOpenStatus(true);
        }}
      >
        {button.text}
      </Button>
      <Modal
        {...props}
        show={isOpen}
        actions={
          <>
            <Button
              onClick={() => {
                setOpenStatus(false);
              }}
              option="light"
            >
              Cancel
            </Button>
            <Button
              aria-disabled={!isValid}
              onClick={() => {
                const form = formElementRef.current;
                if (
                  typeof form.reportValidity === 'function'
                    ? form.reportValidity()
                    : form.checkValidity() // IE workaround; HTML validation tooltips won't be visible
                ) {
                  form.dispatchEvent(new Event('submit'));
                  setOpenStatus(false);
                }
              }}
              option="emphasized"
            >
              Create
            </Button>
          </>
        }
        onClose={() => {
          setOpenStatus(false);
        }}
        title={title}
      >
        {renderForm({
          formElementRef,
          isValid,
          onChange: handleFormChanged,
          onError: handleFormError,
          onCompleted: handleFormSuccess,
        })}
      </Modal>
    </div>
  );
};

ModalWithForm.propTypes = {
  performRefetch: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  button: PropTypes.exact({
    text: PropTypes.string.isRequired,
    glyph: PropTypes.string,
  }).isRequired,
  renderForm: PropTypes.func.isRequired,
};
ModalWithForm.defaultProps = {
  performRefetch: () => {},
};

export default ModalWithForm;
// @flow
import React, { useState } from 'react';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import TabsRegistration from '../TabsRegistration/TabsRegistration';
import EnterSvgIcon from '../../assets/icons/EnterSvgIcon';

const ModalRegistration = ({ authUser }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    if (!authUser) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      style={{ display: authUser ? 'none' : 'block' }}
      title='Sign in or Sign up'
      className='modal'
    >
      <div className='modal__button' onClick={handleOpen}>
        <EnterSvgIcon />
      </div>
      <Modal open={open} onClose={handleClose}>
        <div className='modal__content'>
          <TabsRegistration onCloseModal={handleClose} />
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

export default connect(mapStateToProps)(ModalRegistration);

import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { Alert } from '@mui/material';
import { useGlobalContext } from '../service/GlobalContext';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const { state, dispatch } = useGlobalContext();

  const openModal = () => {
    dispatch({ type: 'OPEN_MODAL' });
  };

  const handleClose = () => {
    openModal();
  };

  return (
    <React.Fragment>
      <Dialog
        open={!state.isModalOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Alert severity="warning">{'Please select at least one source.'}</Alert>
      </Dialog>
    </React.Fragment>
  );
}

import { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';

function FirstTimeNotification() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasSeenMessage = localStorage.getItem('seenWelcomeMessage');

    if (!hasSeenMessage) {
      setOpen(true);
      localStorage.setItem('seenWelcomeMessage', 'true'); // Mark as seen
    }
  }, []);

  return (
    <Snackbar
      open={open}
      autoHideDuration={10000}
      onClose={() => setOpen(false)}
    >
      <Alert
        onClose={() => setOpen(false)}
        severity="info"
        sx={{ width: '100%' }}
      >
        Please be patient while we fetch data. Backend is hosted on Render, and
        on free version there is deliberate wait time.
      </Alert>
    </Snackbar>
  );
}

export default FirstTimeNotification;

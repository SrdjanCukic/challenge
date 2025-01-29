import {
  Alert,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useGlobalContext } from '../service/GlobalContext.jsx';

const NewsSourceModal = () => {
  const { state, dispatch } = useGlobalContext();
  const [sources, setSources] = useState(state.selectedSources);
  const [error, setError] = useState('');

  // Check if any source is selected whenever the 'sources' state changes
  useEffect(() => {
    const activeSources = Object.values(sources).filter(Boolean);
    if (activeSources.length === 0) {
      setError('Please select at least one source.');
    } else {
      setError('');
    }
  }, [sources]);

  const handleSourceChange = source => {
    const updatedSources = {
      ...sources,
      [source]: !sources[source],
    };
    setSources(updatedSources);
  };

  const handleSave = e => {
    e.preventDefault();

    // Check if at least one source is selected
    const activeSources = Object.keys(sources).filter(
      source => sources[source],
    );

    if (activeSources.length === 0) {
      setError('Please select at least one source.');
      return; // Prevent saving
    }

    // Dispatch the updated sources to global state
    dispatch({ type: 'UPDATE_SOURCES', payload: sources });

    // Close the modal
    dispatch({ type: 'CLOSE_MODAL' });
  };

  const handleCloseModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  return (
    <div>
      <Dialog
        open={state.isModalOpen}
        onClose={handleCloseModal}
        fullWidth
        keepMounted={false}
      >
        <form
          onSubmit={handleSave}
          className="bg-background-mode text-foreground"
        >
          <DialogTitle className="bg-background-mode">
            Select at least one source:
          </DialogTitle>
          <Divider className="bg-primary" />
          {error && <Alert severity="warning">{error}</Alert>}
          <DialogContent className="bg-background-mode">
            <Typography className="text-foreground">Sources:</Typography>
            <Stack>
              {Object.keys(sources).map(source => (
                <label key={source}>
                  <Checkbox
                    checked={sources[source]}
                    onChange={() => handleSourceChange(source)}
                  />
                  {source}
                </label>
              ))}
            </Stack>
          </DialogContent>
          <Stack
            direction="row"
            spacing={2}
            divider={<Divider orientation="vertical" flexItem />}
            className="mb-7 mr-7 flex justify-end bg-background-mode align-middle"
          >
            <Button type="button" onClick={handleCloseModal} color="error">
              Cancel
            </Button>

            <Button type="submit">Save</Button>
          </Stack>
        </form>
      </Dialog>
    </div>
  );
};

export default NewsSourceModal;

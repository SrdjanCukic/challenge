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
  const [localSources, setLocalSources] = useState(state.selectedSources);
  const [error, setError] = useState('');

  // Initialize local sources state when modal is opened
  useEffect(() => {
    if (state.isModalOpen) {
      setLocalSources(state.selectedSources);
    }
  }, [state.isModalOpen, state.selectedSources]);

  // Check if any source is selected whenever the 'localSources' state changes
  useEffect(() => {
    const activeSources = Object.values(localSources).filter(Boolean);
    if (activeSources.length === 0) {
      setError('Please select at least one source.');
    } else {
      setError('');
    }
  }, [localSources]);

  const handleSourceChange = source => {
    const updatedSources = {
      ...localSources,
      [source]: !localSources[source],
    };
    setLocalSources(updatedSources);
  };

  const handleSave = e => {
    e.preventDefault();

    // Check if at least one source is selected
    const activeSources = Object.keys(localSources).filter(
      source => localSources[source],
    );

    if (activeSources.length === 0) {
      setError('Please select at least one source.');
      return; // Prevent saving
    }

    // Dispatch the updated sources to global state
    dispatch({ type: 'UPDATE_SOURCES', payload: localSources });

    // Close the modal
    dispatch({ type: 'CLOSE_MODAL' });
  };

  const handleCloseModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  const allSourcesUnselected = Object.values(localSources).every(
    value => !value,
  );

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
              {Object.keys(localSources).map(source => (
                <label key={source}>
                  <Checkbox
                    checked={localSources[source]}
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

            <Button
              type="submit"
              disabled={allSourcesUnselected}
              sx={{
                '&.Mui-disabled': {
                  backgroundColor: '#D3D3D3',
                  color: '#ffffff',
                },
              }}
            >
              Save
            </Button>
          </Stack>
        </form>
      </Dialog>
    </div>
  );
};

export default NewsSourceModal;

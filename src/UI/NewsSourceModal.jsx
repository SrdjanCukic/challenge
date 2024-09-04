import {
  Alert,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Stack,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../service/useLocalStorage';

const DEFAULT_SOURCES = {
  'The New York Times': true,
  'News Api': true,
  ' Gnews': true,
};

const NewsSourceModal = ({ isOpen, toggleModal }) => {
  const navigate = useNavigate();

  const [sources, setSources] = useLocalStorage('newsSources', DEFAULT_SOURCES);
  const [error, setError] = useState('');

  const handleSourceChange = source => {
    const updatedSources = {
      ...sources,
      [source]: !sources[source],
    };
    setSources(updatedSources);

    const activeSources = Object.values(updatedSources).filter(Boolean);
    if (activeSources.length > 0) {
      setError('');
    }
  };

  const handleSave = e => {
    e.preventDefault();
    const activeSources = Object.keys(sources || {}).filter(
      source => sources[source],
    );

    if (activeSources.length === 0) {
      setError('Please select at least one source.');
      return;
    }

    const sourcesString = activeSources.join(',');

    navigate(`/personalized-news/${sourcesString}`);
    toggleModal();
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={toggleModal} fullWidth keepMounted={false}>
        <form onSubmit={handleSave}>
          <DialogTitle>Select at least one source:</DialogTitle>
          <Divider />
          {error && <Alert severity="error">{error}</Alert>}
          <DialogContent>
            <DialogContentText>Sources:</DialogContentText>
            <Stack>
              {Object.keys(sources || DEFAULT_SOURCES).map(source => (
                <label key={source}>
                  <Checkbox
                    type="checkbox"
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
            sx={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginBottom: '30px',
              marginRight: '30px',
            }}
          >
            <Button
              type="button"
              variant="outlined"
              color="error"
              onClick={toggleModal}
            >
              Cancel
            </Button>
            <Button variant="outlined" type="submit">
              Save
            </Button>
          </Stack>
        </form>
      </Dialog>
    </div>
  );
};

export default NewsSourceModal;

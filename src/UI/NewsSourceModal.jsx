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
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DEFAULT_SOURCES = {
  'The New York Times': true,
  'News Api': true,
  Gnews: true,
};

const NewsSourceModal = ({ isOpen, toggleModal }) => {
  const navigate = useNavigate();

  // Use regular useState for sources
  const [sources, setSources] = useState(() => {
    // Initialize from local storage or use default
    const savedSources = localStorage.getItem('newsSources');
    return savedSources ? JSON.parse(savedSources) : DEFAULT_SOURCES;
  });
  const [error, setError] = useState('');

  useEffect(() => {
    // Show error if all sources are unselected
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
    const activeSources = Object.keys(sources).filter(
      source => sources[source],
    );

    // Save to local storage on submit
    localStorage.setItem('newsSources', JSON.stringify(sources));

    // Navigate based on active sources
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
          {error && <Alert severity="warning">{error}</Alert>}
          <DialogContent>
            <DialogContentText>Sources:</DialogContentText>
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

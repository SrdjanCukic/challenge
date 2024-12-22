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
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../service/GlobalContext.jsx';

const DEFAULT_SOURCES = {
  'The New York Times': true,
  'News Api': true,
  Gnews: true,
};

const NewsSourceModal = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useGlobalContext();

  const [sources, setSources] = useState(() => {
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
                    sx={{
                      color: 'rgb(var(--primary))',
                      '&.Mui-checked': {
                        color: 'rgb(var(--primary))',
                      },
                    }}
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
            <Button type="button" onClick={handleCloseModal}>
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

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
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewsSourceModal = ({ isOpen, toggleModal }) => {
  const navigate = useNavigate();
  const [sources, setSources] = useState({
    "The New York Times": true,
    "News Api": true,
    Gnews: true,
  });
  const [error, setError] = useState("");

  const handleSourceChange = (source) => {
    const updatedSources = {
      ...sources,
      [source]: !sources[source],
    };
    setSources(updatedSources);

    // Clear the error message if at least one source is selected
    const activeSources = Object.values(updatedSources).filter(
      (value) => value
    );
    if (activeSources.length > 0) {
      setError("");
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const activeSources = Object.keys(sources).filter(
      (source) => sources[source]
    );

    if (activeSources.length === 0) {
      setError("Please select at least one source.");
      return;
    }

    const sourcesString = activeSources.join(",");

    navigate(`/personalized-news/${sourcesString}`);
    console.log("handle save");
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
              {Object.keys(sources).map((source) => (
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
              justifyContent: "flex-end",
              alignItems: "center",
              marginBottom: "30px",
              marginRight: "30px",
            }}
          >
            <Button variant="outlined" type="submit">
              Save
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="error"
              onClick={toggleModal}
            >
              Cancel
            </Button>
          </Stack>
        </form>
      </Dialog>
    </div>
  );
};

export default NewsSourceModal;

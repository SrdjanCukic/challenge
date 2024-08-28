import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const PreferencesForm = ({ isOpen, toggleModal }) => {
  const navigate = useNavigate();
  const [sources, setSources] = useState({
    "The New York Times": true,
    "News Api": true,
    Gnews: true,
  });
  const [error, setError] = useState("");

  let paperRef = useRef(null);

  useEffect(() => {
    let maybeHandler = (event) => {
      if (paperRef.current && !paperRef.current.contains(event.target)) {
        toggleModal();
        console.log("registruje");
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  }, [toggleModal]);

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

  const handleSave = () => {
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

  if (!isOpen) return null;

  return (
    <div>
      <Dialog open={isOpen} PaperProps={{ ref: paperRef }}>
        <DialogTitle>Set Your Preferences</DialogTitle>
        {error && (
          <DialogContentText style={{ color: "red" }}>
            {error}
          </DialogContentText>
        )}
        <DialogContent>
          <DialogContentText>Sources:</DialogContentText>
          <DialogActions>
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
          </DialogActions>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleSave}>
            Save Preferences
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PreferencesForm;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PreferencesForm = () => {
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
  };

  return (
    <div>
      <h2>Set Your Preferences</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div>
        <h3>Sources:</h3>
        {Object.keys(sources).map((source) => (
          <label key={source}>
            <input
              type="checkbox"
              checked={sources[source]}
              onChange={() => handleSourceChange(source)}
            />
            {source}
          </label>
        ))}
      </div>
      <button onClick={handleSave}>Save Preferences</button>
    </div>
  );
};

export default PreferencesForm;

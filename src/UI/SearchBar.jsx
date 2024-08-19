import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/search/${searchQuery}`);
    }
  };

  const navigateBack = () => {
    navigate("/");
    setSearchQuery("");
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
      />
      <button onClick={navigateBack}>back</button>
    </div>
  );
};

export default SearchBar;

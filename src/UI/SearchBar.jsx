import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ toggleModal }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const onSubmit = e => {
    e.preventDefault();
    if (searchQuery === '') return;
    navigate(`/search/${searchQuery}`);
    setSearchQuery('');
  };

  return (
    <div>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        as="form"
        onSubmit={onSubmit}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search News"
          type={'text'}
          color="secondary"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <IconButton type="submit" sx={{ p: '10px' }}>
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton sx={{ p: '10px' }} onClick={toggleModal}>
          <ManageSearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
};

export default SearchBar;

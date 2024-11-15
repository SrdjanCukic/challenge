import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../service/GlobalContext.jsx';

const SearchAndPreferences = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { dispatch } = useGlobalContext();

  const onSubmit = e => {
    e.preventDefault();
    if (searchQuery === '') return;
    navigate(`/search/${searchQuery}`);
    setSearchQuery('');
  };

  const openModal = () => {
    dispatch({ type: 'OPEN_MODAL' });
  };

  return (
    <div>
      <Paper
        component="form"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        as="form"
        onSubmit={onSubmit}
      >
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
            width: {
              sm: 200, // 200px on small screens
              md: 300, // 300px on medium screens
              lg: 400, // 400px on large screens
            },
          }}
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
        <IconButton sx={{ p: '10px' }} onClick={openModal}>
          <ManageSearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
};

export default SearchAndPreferences;

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
        className="bg-gradient-to-r from-primary to-primary/20"
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
              xs: 50,
              sm: 200,
              md: 200,
              lg: 200,
            },
          }}
          placeholder="Search"
          type={'text'}
          className="bg-transparent"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <IconButton
          type="submit"
          sx={{
            p: '5px',
            display: {
              xs: 'none',
              sm: 'block',
              md: 'block',
              lg: 'block',
              xl: 'none',
            },
          }}
        >
          <SearchIcon />
        </IconButton>
        <Divider
          sx={{
            height: 28,
            m: 0.5,
            display: {
              xs: 'none',
              sm: 'block',
              md: 'block',
              lg: 'block',
              xl: 'none',
            },
          }}
          orientation="vertical"
        />
        <IconButton sx={{ p: '10px' }} onClick={openModal}>
          <ManageSearchIcon inert="true" />
        </IconButton>
      </Paper>
    </div>
  );
};

export default SearchAndPreferences;

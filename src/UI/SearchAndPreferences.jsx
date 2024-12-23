import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../service/GlobalContext.jsx';

const SearchAndPreferences = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { dispatch } = useGlobalContext();

  const handleSearchClick = () => {
    setIsExpanded(true);
  };

  const handleClickOutside = event => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
    <div className="flex w-full grow justify-center align-middle">
      <Paper
        component="form"
        className="flex w-full grow items-center justify-between bg-gradient-to-r from-primary/40 to-primary/20 px-2 py-1 bg-transparent"
        classes={{ root: 'rounded-full' }}
        as="form"
        onSubmit={onSubmit}
        ref={inputRef}
        sx={{ borderRadius: '100vh', backgroundColor: 'transparent' }}
        elevation={0}
      >
        <InputBase
          placeholder="Search"
          type={'text'}
          className={`max-w-full flex-1 items-center bg-transparent transition-all duration-300 ease-in-out max-md:pl-2 ${isExpanded ? 'pl-2 md:w-56' : 'md:w-0'}`}
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />

        <div className="flex shrink-0 items-center justify-between gap-2">
          <IconButton onClick={handleSearchClick} size="small" color='inherit'>
            <SearchIcon />
          </IconButton>

          <span className="h-[1.5rem] w-[1px] grow bg-primary/40" />

          <IconButton onClick={openModal} size="small" color='inherit'>
            <ManageSearchIcon inert="true" />
          </IconButton>
        </div>
      </Paper>
    </div>
  );
};

export default SearchAndPreferences;

import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
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
    <div className="flex justify-center align-middle">
      <Paper
        component="form"
        className="flex h-8 items-center justify-between rounded-full bg-gradient-to-r from-primary/60 to-primary/20"
        as="form"
        onSubmit={onSubmit}
        ref={inputRef}
      >
        <InputBase
          placeholder="Search"
          type={'text'}
          className={`ml-1 bg-transparent transition-all duration-1000 ease-in-out ${isExpanded ? 'flex-1' : 'w-0'}`}
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{ width: isExpanded ? '100%' : '0' }}
        />
        <IconButton className="h-5 p-1" onClick={handleSearchClick}>
          <SearchIcon className="max-h-4.4" />
        </IconButton>
        <Divider className="m-2 max-h-5" orientation="vertical" />
        <IconButton className="p-2.5" onClick={openModal}>
          <ManageSearchIcon inert="true" />
        </IconButton>
      </Paper>
    </div>
  );
};

export default SearchAndPreferences;

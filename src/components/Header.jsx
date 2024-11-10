import SearchAndPreferences from '../UI/SearchAndPreferences';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { Link } from 'react-router-dom';

function Header({ toggleModal }) {
  return (
    <div className="sticky top-0 z-50 mb-8 flex items-center justify-between border-b border-black/10 bg-white/50 px-2 py-5 backdrop-blur-md">
      <Link
        to="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        <NewspaperIcon fontSize="large" />
        <div className="hidden md:block">Global Pulse</div>
      </Link>
      <SearchAndPreferences toggleModal={toggleModal} />
    </div>
  );
}

export default Header;

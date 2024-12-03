import SearchAndPreferences from '../UI/SearchAndPreferences';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { Link } from 'react-router-dom';
import Example from '../UI/ToggleTheme';

function Header() {
  return (
    <div className="sticky top-0 z-50 mb-4 w-screen border-b border-background/10 bg-foreground/20 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-5">
        <Link
          to="/"
          className="flex items-center text-inherit no-underline"
          aria-label="Global Pulse homepage"
        >
          <NewspaperIcon fontSize="large" className="text-foreground" />
          <div className="hidden pl-1 text-foreground md:block">
            Global Pulse
          </div>
        </Link>
        <SearchAndPreferences />
        <Example />
      </div>
    </div>
  );
}

export default Header;

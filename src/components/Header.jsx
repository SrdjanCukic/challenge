import SearchAndPreferences from '../UI/SearchAndPreferences';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { Link } from 'react-router-dom';
import Example from '../UI/ToggleTheme';

function Header() {
  return (
    <div className="sticky top-0 z-50 w-dvw border-b border-background/50 bg-background/40 backdrop-blur-md">
      <div className="container flex items-center justify-between gap-4 px-10 py-4">
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
        <div className="flex items-center gap-4">
          <SearchAndPreferences />
          <Example />
        </div>
      </div>
    </div>
  );
}

export default Header;

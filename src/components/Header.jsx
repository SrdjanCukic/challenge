import styled from 'styled-components';
import SearchBar from '../UI/SearchBar';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { Link } from 'react-router-dom';

const StyledHeader = styled.header`
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1.2rem 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0;
  position: sticky;
  z-index: 100;
`;

function Header({ toggleModal }) {
  return (
    <StyledHeader>
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
        <div>Global Pulse</div>
      </Link>
      <SearchBar toggleModal={toggleModal} />
    </StyledHeader>
  );
}

export default Header;

//Imports
import { FC, useState } from 'react';
import './SearchBar.css';

//Types
type Props = {
  onSearch: (term: string) => void;
};

//Component that uses a prop to search for the value in the input field when button clicked
const SearchBar: FC<Props> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = () => {
    if (searchTerm) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="search-container">
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a word..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;

import React, { useRef } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate()
  const ref = useRef(null);

  const handleSearch = (e) => {
    const query = ref.current.value

    if (!query) return;

    navigate(`/search/${query}`)
  }

  const handleClick = (e) => {
    const query = ref.current.value

    if (!query) return;

    if (e.key === 'Enter')
      navigate(`/search/${query}`)

  }


  return (
    <div className="search-box">
      <input ref={ref} type="text" className="search-bar" placeholder="Search..." onKeyDown={handleClick} />
      <SearchIcon className="search-icon" onClick={handleSearch} />
    </div>
  )
}

export default SearchBar
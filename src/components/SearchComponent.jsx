import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ItemDescription } from './ItemDescription'
import SearchBar from './SearchBar';
const env = import.meta.env;

const SearchComponent = () => {
  const { keyword } = useParams()

  const [books, setBooks] = useState([])
  // const [bookLength, setBookLength] = useState(0);
  const [loading, setLoading] = useState(true);
  // const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    const getBooks = async () => {
      setLoading(true);
      const res = await fetch(`${env.VITE_BASE_URL}/book/search?keyword=${keyword}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()

      if (data.key === "SUCCESS") {
        setBooks((prev) => {
          return [...data.result];
        });
        setLoading(false);
      } else {
        console.log(data.error);
        setLoading(false);
      }
      console.log(data);
    }
    getBooks();
  }, [keyword])

  if (loading) return (<div className='container-loading'>Loading...</div>);


  return (<>
    <div>
      <h1 className='home-title'>Search Results for keyword: "{keyword}"</h1>
    </div>

    <SearchBar />

    {
      books.length === 0 ? (<div className='container-loading'>No results found</div>) : (
        <div className='home-container'>
          {
            books.map((book) => {
              return (
                <ItemDescription key={book._id} book={book}></ItemDescription>
              )
            })
          }
        </div>
      )
    }


  </>
  )
}

export default SearchComponent
import { useEffect, useState } from 'react'
import { useGlobalContext } from "../context/AuthContext"
import SearchBar from './SearchBar'
import { ItemDescription } from './ItemDescription';
const env = import.meta.env;

function PaginateComponent(props) {
  return (<div className='paginate-container'>
    {Array.from({
      length: props.bookLength
    }).map((_, i) => {
      return <button key={i} className={(props.pageIndex === i + 1) ? 'paginate-disabled' : ''} onClick={() => {
        props.setPageIndex(i + 1);
      }} style={{}} disabled={props.pageIndex === i + 1}>{i + 1}</button>;
    })}
  </div>);
}


const Home = () => {
  const auth = useGlobalContext();
  const { values } = auth;
  const { isLoggedIn } = values;

  const [books, setBooks] = useState([])
  const [bookLength, setBookLength] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    const getBooks = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${env.VITE_BASE_URL}/book?pageSize=12&pageIndex=${pageIndex}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await res.json()

        if (data.key === "SUCCESS") {
          setBooks((prev) => {
            return [...data.result.items];
          });
          setBookLength(data.result.totalPages);
          setLoading(false);
        } else {
          console.log(data.error);
          setLoading(false);
        }
        // console.log([...data.result.items]);
      } catch (e) {
        console.log(e.message);
      }
    }
    getBooks();
  }, [pageIndex])

  if (loading) return (<div className='container-loading'>Loading...</div>);

  return (
    <>
      <div>
        <h1 className='home-title'>Welcome to NS BookStore</h1>
      </div>

      <SearchBar />

      <div className='home-container'>
        {
          books.map((book) => {
            return (
              <ItemDescription key={book._id} book={book}></ItemDescription>
            )
          })
        }
      </div>

      <PaginateComponent className={''} bookLength={bookLength} pageIndex={pageIndex} setPageIndex={setPageIndex}></PaginateComponent>
    </>
  )
}

export default Home
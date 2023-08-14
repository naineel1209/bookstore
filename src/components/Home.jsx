import { useEffect, useState } from 'react'
import { useGlobalContext } from "../context/AuthContext"
const env = import.meta.env;


function ItemDescription(props) {
  const [contracted, setContracted] = useState(true);

  return (
    <div className='card'>
      <div className='card-body'>
        <img src={props.book.base64image} alt={props.book.name.toUpperCase()} className="card-image" />
        <div style={{ paddingTop: '1rem' }}>
          <h2 className="card-title">{props.book.name.toUpperCase()}</h2>

          <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', paddingInline: '1rem', paddingBlockEnd: '1rem' }}>
            <p className="card-price">${props.book.price}</p>
            <p className='card-category'>{props.book.category}</p>
          </div>
          <p className="card-description">
            {contracted ? props.book.description.substring(0, 30) + '...' : props.book.description}
            <span style={{
              fontSize: 'small',
              cursor: 'pointer',
              color: 'blue',
              textDecoration: 'underline'
            }} onClick={() => {
              setContracted(prev => !prev);
            }}>{(contracted) ? 'Read More' : 'Read Less'}</span>
          </p>

          <button className="card-add2cart">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

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
      setLoading(true);
      const res = await fetch(`${env.VITE_BASE_URL}/book?pageSize=10&pageIndex=${pageIndex}`, {
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
    }
    getBooks();
  }, [pageIndex])

  if (loading) return (<div className='container-loading'>Loading...</div>);

  return (
    <>
      <div>
        <h1 className='home-title'>Welcome to NS BookStore</h1>
      </div>
      <div className='home-container'>
        {
          books.map((book) => {
            return (
              <>
                <ItemDescription key={book._id} book={book}></ItemDescription>
              </>
            )
          })
        }
      </div>

      <PaginateComponent className={''} bookLength={bookLength} pageIndex={pageIndex} setPageIndex={setPageIndex}></PaginateComponent>
    </>
  )
}

export default Home
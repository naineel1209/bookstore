import { useState } from 'react';

export function ItemDescription(props) {
  const [contracted, setContracted] = useState(true);

  return (
    <div key={props.book._id} className='card'>
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

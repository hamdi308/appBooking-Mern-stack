import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
const SearchItem = ({item}) => {
  return (
      <div className='searchItem'>
          <img className='siImg' src={item.photos[0]} alt="" />
        <div className="siDesc">
        <h1 className="siTitle">{ item.name }</h1>
        <span className="siDistance">{ item.distance } from the center of the city</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          {item.title}
              </span>
        <span className="siFeatures">{ item.description }</span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
        </div>
          <div className='siDetails'>
             {item.rating && <div className='siRating'>
              <span>Excelent</span>
          <button>{ item.rating }</button>
              </div>}
              <div className='siDetailstexts'>
          <span className='siPrice'>{ item.cheapestPrice }</span>
          <span className='siTaxOp'>Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}><button className='siCheckButton'>See availability</button></Link>
              </div>
          </div>
      </div>
  )
}

export default SearchItem
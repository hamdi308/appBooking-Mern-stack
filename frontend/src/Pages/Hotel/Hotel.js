import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import { Header } from '../../Components/Header/Header';
import MailList from '../../Components/MailList/MailList';
import Navbar from '../../Components/Navbar/Navbar';
import Reserve from '../../Components/Reserve/Reserve';
import { AuthContext } from '../../context/AuthContext';
import { SearchContext } from '../../context/SearchContext';
import useFetch from '../../hooks/useFetch';
import './index.css';

const Hotel = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location)
  const id = location.pathname.split("/")[2];
  const [slideNumber, SetSlideNumber] = useState(0);
  const [openSlide, SetOpenSlide] = useState(false);
  const [openModal, SetOpenModal] = useState(false);
  const handleOpen = (i) => {
    SetSlideNumber(i);
    SetOpenSlide(true);
  }
    const { data, loading, error, reFetch } = useFetch(`/hotel/find/${id}`);
    const lengthPhotos = data.photos?.length;
    const handleMove = (direction) => {
      let newSlideNumber;
      if (direction === 'l') {
        newSlideNumber = slideNumber === 0 ? lengthPhotos - 1 : slideNumber - 1;
        } else {
        newSlideNumber = slideNumber === lengthPhotos - 1 ? 0 : slideNumber + 1;
      }
      SetSlideNumber(newSlideNumber);
  };
  const { dates,options } = useContext(SearchContext);
  console.log(dates);
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const timeDiff = ( date1,date2 )=>{
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  const days = timeDiff(dates[0].endDate, dates[0].startDate);
  const handleClick = () => {
    if (user) {
      SetOpenModal(true);
    } else {
      navigate('/login')
    }
  }
  return (
    <div>
      <Navbar />
      <Header type="list" />
   {loading ? ("Loading" ) : <> (<div className='hotlContaine'>
        {openSlide && <div className='slider'>
          <FontAwesomeIcon icon={faCircleXmark} className='close' onClick={()=>SetOpenSlide(false)}/>
          <FontAwesomeIcon icon={faCircleArrowLeft} className='arrow' onClick={()=>handleMove('l')}/>
          <div className='sliderWrapper'>
            <img src={data.photos[slideNumber]} alt=""/>
          </div>
          <FontAwesomeIcon icon={faCircleArrowRight} className='arrow' onClick={()=>handleMove('r')}/>
        </div>}
        <div className='hotelWrapper'>
          <button className='bookNow' type="">Book Now !</button>
          <h1 className='hotelTitle'>{ data.name }</h1>
          <div className='hotelAddress'>
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{ data.adress }</span>
          </div>
          <span className='hotelDistance'>Excelent location { data.distance } from center</span>
          <span className='hotelPriceHightlight'>Book a stay over { data.cheapestPrice } at this property and get a free airport Taxi</span>
          <div className='hotelImages'>
            {data.photos?.map((photo,index) => (
              <div className='hotelImgWrapper'>
                <img onClick={()=>handleOpen(index)} src={photo.src} className='hotelSingleImg' alt=''/>
              </div>
            ))}
            <div className='hotelDetails'>
              <div className='hotelDetailsTexts'>
                <h1 className='hotelTitle'>{ data.title }</h1>
                <p>{ data.desc }</p></div>
              <div className='hotelDetailsPrice'>
                <h1>Perfect for a 9-night stay!</h1>
                <span>Located in the real heart of Mahdia, this property has an excellent location score of 9.8!</span>
                <h2><b>${ days*data.cheapestPrice*options.room } </b>({days} nights)</h2>
                <button onClick={handleClick}>Book Now !</button>
              </div>
            </div>
          </div>
        </div>
      </div>)</>}
      <MailList />
      <Footer />
      {openModal && <Reserve setOpen={ SetOpenModal } hotelId={id} />}
    </div>
  )
}

export default Hotel
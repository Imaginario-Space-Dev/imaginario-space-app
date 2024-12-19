import React from 'react'
import styled from 'styled-components'
import {UseUserContext} from '../../mainIndex'

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import Slider from 'react-slick'
import {SearchBar1} from '../index'
import { Link } from 'react-router-dom';
import {FaPlay} from 'react-icons/fa'; 

const Carousel2 = ({list}) => {
  const {currentUser} = UseUserContext()

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    autoplay: true,
    autoplaySpeed: 5000,

  };

  // if(!list) return <div className="loading"></div>

  return (
    <Wrapper>
    <section className='carousel-container-1 m-0'>
    {/* {!currentUser && 
                <div className='search-bar-home'>
                <SearchBar1 />
              </div>
              } */}
      <Slider {...settings}>
        {/* {list?.filter(item => item?.display === true && (new Date > new Date(item?.displayPeriodStart) && new Date < new Date(item?.displayPeriodEnd))).sort((a, b) => a.position > b.position).map((person) => { */}
        {list?.filter(item => item?.display === true).sort((a, b) => a.position > b.position).map((person) => {
          const { _id,file, contentType,promo, title, desc, url } = person;
          return (
            <article key={_id} className='carousel-1 '>
              <img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}/${file}`} alt={title && title} className='slide-img' />
              <div  className='img-shadow-left'>
              <div  className='img-shadow-right'>
              <div className='carousel-info'>
              <h1 className='title '>{title}</h1>
              <p className='rating'>{promo}% OFF</p>
              <p className='desc'><div dangerouslySetInnerHTML={{ __html: desc }} /></p>
              <Link to={url} className='buttom'>
              <FaPlay className='mx-1'/>
              <span className='mx-1' >{contentType === 'book' ? 'Read Now': 'Watch Now'}</span> 
              </Link>
              </div>
              </div>
              </div>
             
            </article>
          );
        })}
      </Slider>
    </section>   
    </Wrapper>)
}

const Wrapper = styled.div`
.carousel-container-1 {
  position: relative;
  width: 100%;
  /* height: calc(100vh - 10rem); */
  height: 80vh;
}

.carousel-1{
    position: relative;
    width: 100%;
    /* height: calc(100vh - 10rem); */
    height: 80vh;
}

.slide-img{
  height: 100%;
  width: 100%;
  object-fit: cover;
  opacity: 0.8;
}
.search-bar-home{
    position: absolute;
    top: 8rem;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
}


/* CAROUSSEL */
.slick-slider {
    width: 100%;
}

.slick-prev {
    top: 40%;
    left: 60px;
    z-index: 1;
}

.slick-next {
    top: 40%;
    right: 60px;
}
.slick-prev::before, .slick-next::before{
    color:  #fff;
}


.slick-dots {
    background-color: #fff;
}
/* CAROUSSEL */

.carousel-info{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
  padding-left: 60px;
  padding-right: 60px;
  background-image: linear-gradient(to top,
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, .9),
    rgba(0, 0, 0, .8),
    rgba(0, 0, 0, .6),
    rgba(0, 0, 0, .2),
    rgba(0, 0, 0, 0)
);
background-color: transparent;
}

.img-shadow-left{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  background-image: linear-gradient(to left,
    rgba(0, 0, 0, .6),
    rgba(0, 0, 0, .2),
    rgba(0, 0, 0, 0)
);
}

.img-shadow-right{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  background-image: linear-gradient(to right,
    
    rgba(0, 0, 0, .6),
    rgba(0, 0, 0, .2),
    rgba(0, 0, 0, 0)
);
}

.title {
  font-size: 70px;
  color: #fff;
}

.rating {
  color: var(--color-5);
}

.desc {
  color: var(--color-5);
  font-size: 20px;
  overflow-y: scroll;
  height: 3rem;
}

.buttom{
  padding: 10px;
  border-radius: 20px;
  background-color: var(--color-4);

  svg{
    color: var(--color-1);
  }

  span{
    color: var(--color-1);
  }
}


 /* Extra large devices (large desktops) */
 @media (min-width: 1200px) {

}

/* Extra large devices (large desktops) */
@media (max-width: 1199px) {

.title {
  font-size: 50px;
}

.rating {
    font-size: 12px;
}

.desc {
    font-size: 16px;
}

}

/* Large devices (desktops) */
@media (max-width: 991px) {
    /* CAROUSEL */
.slick-prev {
    left: 20px;

}

.slick-next {
    right: 20px;
}
/* CAROUSEL */
.carousel-info{
  padding-left: 20px;
  padding-right: 20px;
}
.rating {
    font-size: 11px;
}

.desc {
    font-size: 16px;
}
}

/* Medium devices (tablets) */
@media (max-width: 767px) {
.carousel-container-1{
  height: calc(100vh - 13rem);

  width: 100%;
}

.carousel-1{
  height: calc(100vh - 13rem);
  width: 100%;
}


.title {
  font-size: 40px;
}

.rating {
    font-size: 11px;
}

.desc {
    font-size: 14px;
}
}

@media (max-width: 576px) {
.title {
  font-size: 40px;
}

.rating {
    font-size: 11px;
}

.desc {
    font-size: 12px;
}
}

@media (max-width: 366px) {

}



`

export default Carousel2

import React, { useState } from 'react'
import styled from 'styled-components'
import {UseUserContext} from '../../mainIndex'
import {list} from '../../data/carousel'

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import Slider from 'react-slick'
import {SearchBar1} from '../index'
import { Link } from 'react-router-dom';
import {FaPlay} from 'react-icons/fa'; 

const CarouselBooks = () => {
  const {currentUser} = UseUserContext()
  const [listBook, setlist] = useState([...list])

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    autoplay: true,
    autoplaySpeed: 5000,

  };

  return (
    <Wrapper>
    <section className='carousel-container-1 m-0'>
    {/* {!currentUser && 
                <div className='search-bar-home'>
                <SearchBar1 />
              </div>
              } */}
      <Slider {...settings}>
        {listBook.map((person) => {
          const { id, image, rating, title, desc, url } = person;
          return (
            <article key={id} className='carousel-1'>
              <img src={image} alt={title} className='slide-img' />
              <div  className='img-shadow-left'>
              <div  className='img-shadow-right'>
              <div className='carousel-info '>
              <h1 className='title '>{title}</h1>
              <p className='rating '>{rating}/10</p>
              <p className='desc '>{desc}</p>
              <Link to={url} className='buttom '>
              <FaPlay className='mx-1'/>
              <span className='mx-1' >Read Now</span> 
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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40vh;
}

.carousel-1{
    position: relative;
    width: 100%;
    height: 40vh;
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
    top: 50%;
    left: 20px;
    z-index: 1;
}

.slick-next {
    top: 50%;
    right: 20px;
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
  font-size: 30px;
  color: #fff;
}

.rating {
  color: var(--color-5);
  font-size: 11px;
}

.desc {
  color: var(--color-5);
  font-size: 15px;
  overflow-y: scroll;
  height: 2rem;
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

@media (min-width: 992px) {

}


/* Large devices (desktops) */
@media (max-width: 991px) {
.carousel-container-1{
  height: 40vh;
  width: 100%;
}

.carousel-1{
  height: 40vh;
  width: 100%;
}

    /* CAROUSEL */
.slick-prev {
    left: 20px;
    top: 45%;

}

.slick-next {
    right: 20px;
    top: 45%;
}
/* CAROUSEL */
.carousel-info{
  padding-left: 20px;
  padding-right: 20px;
}

.title {
  font-size: 40px;

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
  height: 40vh;
  width: 100%;
}

.carousel-1{
  height: 40vh;
  width: 100%;
}


.title {
  font-size: 20px;
}

.rating {
    font-size: 11px;
    margin-bottom: 3px;
}

.desc {
    font-size: 12px;
    height: 2rem;
    margin-bottom: 5px;
}

.buttom{
  padding: 5px;
  font-size: 10px;
  svg{
    color: var(--color-1);
    font-size: 10px;
  }
}
}


@media (max-width: 576px) {
.title {
  font-size: 20px;
}

.rating {
    font-size: 11px;
}

.desc {
    font-size: 11px;

}
}

@media (max-width: 366px) {

}



`

export default CarouselBooks

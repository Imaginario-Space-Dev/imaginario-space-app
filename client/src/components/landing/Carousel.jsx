import React from 'react'
import styled from 'styled-components'
import {UseUserContext} from '../../mainIndex'

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import Slider from 'react-slick'
import {SearchBar1} from '../index'
import { Link } from 'react-router-dom';
import {FaPlay} from 'react-icons/fa'; 

const Carousel = ({list}) => {
  const {currentUser} = UseUserContext()

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    autoplaySpeed: 3000,

  };

  return (
    <Wrapper>
    <section className='carousel-container-1 m-0'>
      <Slider {...settings}>
        {list.map((person) => {
          const { id, image, rating, title, desc, url } = person;
          return (
            <article key={id} className='carousel-1'>
              <img src={image} alt={title} className='person-img' />
              {currentUser && 
                <div className='search-bar-home'>
                <SearchBar1 />
              </div>
              }
              <div  className='img-shadow-left'>
              <div  className='img-shadow-right'>
              <div className='carousel-info '>
              <h1 className='title '>{title}</h1>
              <p className='rating'>{rating}/10</p>
              <p className='desc'>{desc}</p>
              <Link to={url} className='buttom'>
              <FaPlay className='mx-1'/>
              <span className='mx-1' >What Now</span> 
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
  height: calc(100vh - 10rem);
  background-color: var(--color-2);
}

.carousel-1 {
  height: calc(100vh - 12rem);
  width: 100%;
}

.person-img{
  height: 100%;
  width: 100%;
  object-fit: cover;
  opacity: 0.8;
}


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
  color: var(--color-1);
}

.rating {
  color: var(--color-5);
}

.desc {
  color: var(--color-5);
  font-size: 20px;
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


/* FOR DESKTOP */
@media only screen and (min-width: 1024px) {

}

/* FOR TABLETS AND MOBILE */
@media only screen and (max-width: 1023px) {
.carousel-container-1 {
  position: relative;
  width: 100%;
  padding-left: 25px;
  padding-right: 25px;
  height: calc(100vh - 10rem);
}

.carousel-1{
  height: calc(100vh - 12rem);
  width: 100%;
  

}
.person-img{
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  /* opacity: 0.4; */
 
}
.slick-slider {
  
}


.carousel-info{
  width: 100%;
  height: 50%;
  padding-left: 5px;
  padding-right: 0;
}

/* .carousel-info{
  padding-left: 20px;
  padding-right: 20px;
} */
.title {
  font-size: 30px;
}
.desc {
  color: var(--grey-400);
  font-size: 13px;
}

.buttom{
  padding: 10px;
  border-radius: 20px;
  background-color: var(--color-4);

}

}

`

export default Carousel

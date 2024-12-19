import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import {Film, FilmsTest} from '../index'
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import useWindowResize from '../../hooks/useWindowResize'

import Slider from 'react-slick'

const CoursesHomeContainer = ({films}) => {
    const {width} = useWindowResize()
    const [noCaroValue, setNoCaroValue] = useState(false)
    // console.log(width)

    const toShowUpadted = width > 992 ? 6 : width >= 768 && width <= 991 ? 4 : 
    width >= 540 && width <= 767 ? 3 : width < 540 && width > 366 ? 2 :  2
    
    const settings = {
      dots: false,
      arrows: false,
      infinite: false,
      speed: 500,
      slidesToShow: 8,
      slidesToScroll: 8,
      initialSlide: 0,
      responsive: [

        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 6,
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 6,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 5,
            initialSlide: 1
          }
        },
         {
          breakpoint: 767,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            initialSlide: 1
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 290,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
      ]
    };

  return (
    <Wrapper>
        <div className='home-films-contents' >
         {noCaroValue ? 
        <div className='home-films-content-sub' >
         
         {films.map((item) => {
          const { id, url } = item;
          return (
            <Link to={url}  key={id} className='home-film'>
              
                {/* <Film film={{...item}} screenWidth={width}/> */}
                <FilmsTest film={{...item}} screenWidth={width}/>
             </Link>
          );
        })}
       </div> 
        :
        <Slider {...settings}>
          {films.map((item) => {
          const { id, url } = item;
          return (
            <Link to={url}  key={id} className='home-film'>
              
                {/* <Film film={{...item}} screenWidth={width}/> */}
                <FilmsTest film={{...item}} screenWidth={width}/>
             </Link>
          );
        })}
        </Slider>
        }
          
        </div>
    

    </Wrapper>)
}
const Wrapper = styled.div`
.home-films-contents{
  position: relative;
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
    margin: 0;
    overflow: hidden;
    
}

.slick-slider {
  width: 100% !important;
}
.slick-track {
  display: flex;
  justify-content: start !important;
  float: left !important;
}

.home-films-content-sub {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
    height: 100%;
    width: 100%;
    overflow-x: scroll;
    
}


.home-film > div {
    display: flex;
    justify-content: center !important;
    align-items: center;
    height: 100%;
    width: 100%;
}

 /* Extra large devices (large desktops) */
@media (min-width: 1200px) {
  .home-films-contents{
  height: 19vw !important;
}
.home-film {
    height: 18.5vw !important;
    width: 12vw !important;  
}
}

/* Extra large devices (large desktops) */
@media (max-width: 1199px) {
  .home-films-contents{
  height: 19vw !important;
}
.home-film {
    height: 18.5vw !important;
    width: 15vw !important;  
}
}

/* Large devices (desktops) */
@media (max-width: 991px) {
.home-films-contents{
  height: 26vw !important;
}
.home-film {
    height: 25.5vw !important;
    width: 17.5vw !important;
}
}

/* Medium devices (tablets) */
@media (max-width: 767px) {
.home-films-contents{
  height: 36vw !important;
}
.home-film {
    height: 35.5vw !important;
    width: 24vw !important;
} 
  }


@media (max-width: 575px) {
.home-films-contents{
  height: 51vw !important;
}
.home-film {
    height: 50.5vw !important;
    width: 43vw !important;
    /* width: 100% !important; */
} 
}

@media (max-width: 366px) {
.home-films-contents{
  height: 51vw !important;
}
.home-film {
    height: 50.5vw !important;
    width: 36vw !important;
} 
}

`

export default CoursesHomeContainer

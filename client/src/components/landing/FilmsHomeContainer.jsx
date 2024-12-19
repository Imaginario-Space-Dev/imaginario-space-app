import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import {Film, FilmsTest} from '../index'
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import useWindowResize from '../../hooks/useWindowResize'

import Slider from 'react-slick'

const FilmsHomeContainer = ({films, trackProfile, setUrl, imaUserId}) => {
    const {width} = useWindowResize()
    const [noCaroValue, setNoCaroValue] = useState(false)
    let book = true

    const toShowUpadted = width > 992 ? 6 : width >= 768 && width <= 991 ? 4 : 
    width >= 540 && width <= 767 ? 3 : width < 540 && width > 366 ? 2 :  2
    
    const settings = {
      dots: false,
      arrows: true,
      infinite: false,
      speed: 500,
      slidesToShow: 8,
      slidesToScroll: 1,
      initialSlide: 1,
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
        <Slider {...settings}>
          {films?.length > 0 && films?.map((item) => {
          const { _id } = item;
          return (
            <div  key={_id} className='home-film'>
                <FilmsTest film={{...item}} screenWidth={width} book= {book} setUrl={setUrl} imaUserId={imaUserId} trackProfile={trackProfile}/>
             </div>
          );
        })}
        </Slider>
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


.home-film > div {
    display: flex;
    justify-content: center !important;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: 5px;
}



/* Extra large devices (large desktops) */
@media (min-width: 992px) {
  .home-films-contents{
  height: 19vw !important;
}
.home-film {
    /* height: 18.5vw !important;
    width: 15vw !important;   */
    height: 18.5vw !important;
    width: 12vw !important;
    

    /* height: 25.5vw !important;
    width: 11vw !important; */
}
}

/* Large devices (desktops) */
@media (max-width: 991px) {
.home-films-contents{
  /* height: 20vw !important; */
}
/* .home-film {
    height: 25.5vw !important;
    width: 17.5vw !important;
} */
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

export default FilmsHomeContainer

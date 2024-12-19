import React from 'react'
import styled from 'styled-components'
import {BlogSliderItem} from '../index'

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'

const BlogSliderElement = ({list}) => {
  const settings = {
      dots: true,
      arrows: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,

      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            initialSlide: 0
          }
        },
         {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 0
          }
        },

      ]
  };
  return (
    <Wrapper>
    <div className='blog-slider-container'>
    <Slider {...settings}>
          {list.map((item) => {
          const { id} = item;
          return (
            <BlogSliderItem key={id} item={item}/>
          );
        })}
        </Slider>
         
    </div>
    </Wrapper>)
}

const Wrapper = styled.main`
.slick-slider {
  width: 100% !important;
}
.slick-track {
  display: flex;
  justify-content: start !important;
  float: left !important;
}
.blog-slider-container{
  height: 500px;
  
}

/* Extra large devices (large desktops) */
@media (min-width: 992px) {

}
/* Large devices (desktops) */
@media (max-width: 991px) {

}

/* Medium devices (tablets) */
@media (max-width: 767px) {

}

@media (max-width: 576px) {

}

@media (max-width: 366px) {
}
`

export default BlogSliderElement

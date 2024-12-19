import React from 'react'
import styled from 'styled-components'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import Slider from 'react-slick'

const Testimonial = ({list}) => {

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: false,
        autoplay: true,
        autoplaySpeed: 10000,
    
      };
  return (
    <Wrapper>
    <section id="testemonial" className="p-4 text-white">
      <div className="container">
        <h2 className="text-center">What people say about us</h2>
        <Slider {...settings}>
        {list?.sort((a, b) => a?.position > b?.position).map((item) => {
          const { _id, message, rate, userId } = item;
        
          return (
            <div key={_id} className="row text-center">
            <div className="col">
                <div className="slider">
                    <div>
                        <blockquote className="blockquote">
                            <p className="desc">{message}</p>
                            <p className="desc">Starts {rate}/5</p>
                            <footer className="blockquote-footer">{userId.username}</footer>
                        </blockquote>
                    </div>
                </div>
            </div>
        </div>
          )
        })}
        </Slider>
        
    </div>
    </section>
</Wrapper>)
}

const Wrapper = styled.div`
    

`



export default Testimonial

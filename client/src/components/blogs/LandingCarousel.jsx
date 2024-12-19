import React from 'react'
import styled from 'styled-components'
import { FaBookmark} from 'react-icons/fa';


import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import useWindowResize from '../../hooks/useWindowResize'

import Slider from 'react-slick'
import { Link } from 'react-router-dom';

const LandingCarousel = ({list}) => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: false,
        autoplay: false,
        autoplaySpeed: 8000,
        arrows: false,
    
      };

  return (
    <Wrapper>
    <div className='landingCarousel '>
        <h2>Trending</h2>
      <Slider {...settings}>
        {list.map((item) => {
            const { id, image, title, desc, url } = item;
            
            return(
                <div key={id} className='carousel-container'>
                    <Link to={url} className=''>
                    <img src={image} className='img-carousel'/>
                    </Link>
                    
                    <div className='details'>
                        <h4 className='m-0'>Mindset, Personal Developement</h4>
                        <div className='details-info'>
                        <h1>{title}</h1>
                        <p>{desc}</p>
                        </div>
                        
                        <div className='author-date d-flex justify-content-between align-items-center'>
                            <div className='author-info d-flex'>
                            <img src={image} className='img-author'/>
                            <div className='d-flex flex-column mx-3 justify-content-center'>
                                <p className='author m-0'>Rogerio Kusuti</p>
                                <p className='author-roll m-0'>CEO and Founder</p>
                            </div>
                            </div>
                            <div>
                        <div className='blog-interact d-flex justify-content-end'> 
                        <select className='mx-2' >
                            <option>EN</option>
                            <option>PT</option>
                            <option>FR</option>
                            <option>ES</option>
                        </select>
                            <span><FaBookmark /></span>
                        </div>
                        <span className='align-self-center'>10 mins read | 17, June 2024</span>
                        </div>
                            {/* <span className='align-self-center'>17, June 2024</span> */}

                        </div>
                    </div>
                </div>
            )
        })}
      </Slider>
    </div>
    </Wrapper>)
}

const Wrapper = styled.div`
.landingCarousel{
    position: relative;
    width: 100%;
    
    h2{ 
        margin: 0;
        color: black;
        font-weight: bold;
        text-align: center;
    }
    
}

.carousel-container  {
    display: flex !important;
    /* border: 1px solid var(--color-6);
    border-radius: var(--borderRadius); */
}

.img-carousel{
    object-fit: cover;
    border-radius: var(--borderRadius);
    cursor: pointer; 
}

.details {
    /* border: 1px solid var(--color-6);
    border-radius: var(--borderRadius); */
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    h4{
        color: var(--color-2);
    }
    .details-info{
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        h1{
            color: black;
            margin-bottom: 5px;
            font-weight: bold;
        }
        p{
        margin: 0;
        color: var(--color-9);
        
    }
    }
    
    .author-date {
        margin-top: auto;
        .author-info{
            img{
            border-radius: 50%;
            object-fit: cover;
        }
        div {
                .author {
                    color: var(--color-2);
                    font-weight: bold;
                    
                }
                .author-roll {
                    color: var(--color-9);
                }
            }
        }
        .blog-interact{
            span{
            color: var(--color-9);
            cursor: pointer;
        }
        span:hover{
            color: var(--color-4);
        }
        }
        
    }
    }
/* CAROUSSEL */
.slick-dots {
    background-color: transparent;
    li{
        border-radius: 50%;
        color: var(--color-4) !important;
        button::before{
            color: var(--color-4) !important;
        }
        
    }
}
/* CAROUSSEL */
@media (min-width: 991px) {
.landingCarousel{
    height: 500px;  
    h2{
        margin: 10px 0px;
    }  
}

.carousel-container  {
    height: 400px;
    /* padding: 2px; */
    padding: 10px;  
    transition: var(--transition); 
}

.carousel-container:hover  {
    padding: 0px;  
}
a{
    width: 50%;
    .img-carousel{
        height: 100%;
        width: 100%;
        margin-right: 20px;
}
}


.details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding: 20px;
    h4{
        color: var(--color-2);
    }
    .details-info{
        h1{

        }
        p{
        font-size: 17px;
        
    }
    }
    
    .author-date {
        margin-top: auto;
        .author-info{
            img{
            height: 60px;
            width: 60px;
        }
        div {
                .author {
                    font-size: 15px;
                    
                }
                .author-roll {
                }
            }
        }
        span{
            color: var(--color-9);
        }
        
    }
}

}
@media (max-width: 991px) {
.landingCarousel{
    position: relative;
    height: 790px;
    h2{
        margin: 15px 0px;
        font-size: 30px;
    } 
    
}

.carousel-container  {
    flex-direction: column;
}

a{
    .img-carousel{
        height: 400px;
        width: 100%;
}
}


.details {
    flex-direction: column;
    height: 300px;
    padding-top: 20px;
    
    h4{
        color: var(--color-2);
        font-size: 22px;
    }
    .details-info{

        h1{
            font-size: 40px;
            margin-bottom: 5px;
        }
        p{
        font-size: 22px;    
    }
    }
    
    .author-date {
        .author-info{
            img{
            height: 70px;
            width: 70px;
        }
        div {
            .author {
                font-size: 18px;    
                }
                .author-roll {
                    font-size: 18px;
                }
            }
        }
        span{
            font-size: 18px;
        }
        
    }
    }

}

/* Medium devices (tablets) */
@media (max-width: 767px) {
.landingCarousel{
    position: relative;
    height: 420px;
    
    h2{
        margin: 10px 0px;
        font-size: 20px;
    } 
    
}

.carousel-container  {
    flex-direction: column;
}

a{
    width: 100%;
    .img-carousel{
        height: 200px;
}
}


.details {
    flex-direction: column;
    height: 150px;
    padding-top: 10px;
    h4{
        color: var(--color-2);
        font-size: 10px;
    }
    .details-info{
        h1{
            font-size: 17px;
            margin-bottom: 5px;
        }
        p{
        font-size: 12px;    
    }
    }
    
    .author-date {
        .author-info{
            img{
            height: 40px;
            width: 40px;
        }
        div {
            .author {
                font-size: 10px;    
                }
                .author-roll {
                    font-size: 10px;
                }
            }
        }
        span{
            font-size: 10px;
        }
        
    }
    }
}


`

export default LandingCarousel

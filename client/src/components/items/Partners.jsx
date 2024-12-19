import React from 'react'
import styled from 'styled-components'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'

const Partners = ({list, width}) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: false,
        autoplay: true,
        autoplaySpeed: 10000,
        arrows: false
    
      };

      // Function to chunk array into sub-arrays of specified size
function chunkArray(array, chunkSize) {
    let results = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      let chunk = array.slice(i, i + chunkSize);
      results.push(chunk);
    }
    return results;
  }


const itemNumber = width && width <= 767 ? 2 : 4
  // Chunk the array into sub-arrays of 4 items each
let chunkedArray = chunkArray(list, itemNumber);
  // console.log(width)
  return (
    <Wrapper>
    <section id="partners" className="p-4">
      <div className="container">
        <h2 className="text-center mb-4">Our Partners</h2>
        <Slider {...settings}>
        {chunkedArray.map((itemsRow, index) => {
          return (
            <div key={index} className="row text-center">
            <div className="col">
            {itemsRow.map((items) => {
                const {logo, _id, } = items;
                return (
                  <img key={_id} src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}/${logo}`} alt={'psrtner logo'} className='partner-logo' />
                )             
        })}                
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

.col {
    display: flex;
    justify-content: space-around;
    
    svg {
        font-size: 60px;
    }
}

@media (min-width: 991px) {
.partner-logo {
    padding: 10px;
    height: 150px;
    width: 150px;
}
}

@media (max-width: 991px) {
.partner-logo {
    padding: 10px;
    height: 150px;
    width: 150px;
}
}

/* Medium devices (tablets) */
@media (max-width: 767px) {
.partner-logo {
    padding: 10px;
    svg {
        font-size: 40px;
    }
}  
}

`

export default Partners

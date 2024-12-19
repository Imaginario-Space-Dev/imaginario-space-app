import React from 'react'
import styled from 'styled-components'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'
import {Link} from 'react-router-dom'

const PublishersSlide = ({list, width, action}) => {
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
  // ?.filter(item => item.role === 'publisher')
  return (
    <Wrapper>
    <section id="partners" className="p-4">
      <div className="container">
        <h2 className="text-center mb-4">
        {action == "publisher" ? "Some of Our Publishers" :  
        action == "profile" ? "Profile with the best recommendation for you" : ''}
        </h2>

        <Slider {...settings}>
        {chunkedArray.map((itemsRow, index) => {
          return (
            <div key={index} className="row text-center">
            <div className="col pt-1">
            {itemsRow.map((items) => {
                const {_id, profileImage, username, category, connection} = items;
                return (
                    <div key={_id} className='container-publisher'>
                      <div className='img-container'>
                      <img src={!profileImage?.name ? import.meta.env.VITE_BACKEND_IMAGE_URL+'/no-img-user.png' : `${import.meta.env.VITE_BACKEND_IMAGE_URL}/${profileImage?.name}`} alt={username} className='person-img' />
                    </div>
                    <div className='author'>{username}</div>
                    {category?.map((item, index) => <i className='role m-0' key={index}>{` ${item}`}</i>)}
                    <p className='clicks'>{connection?.length} Connections</p>
                  </div>
                )             
        })}                
        </div>
        </div>
          )
        })}

        </Slider>
        <div className='publ-btn d-flex justify-content-center align-items-center '>
        {action == "publisher" ? <Link to={'/publishers'}>All Publishers</Link> :  
        action == "profile" ? <Link to={'/profiles'}>All Profiles</Link> : ''}
        
        </div>
        
    </div>
    </section>
    </Wrapper>)
}

const Wrapper = styled.div`

.col {
    display: flex;
    justify-content: space-between;
    
    svg {
        font-size: 60px;
    }
}
.container-publisher {
.img-container {
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 0 auto;
  margin-bottom: 1.5rem;

  .person-img {
  width: 100%;
  display: block;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  position: relative;
}

}

.img-container::before {
  content: '';
  width: 100%;
  height: 100%;
  background: var(--color-4);
  position: absolute;
  top: -0.25rem;
  right: -0.5rem;
  border-radius: 50%;
}

.author {
  color: var(--color-1);
  font-size: 15px;
}
.role, .clicks{
  color: var(--color-6);
}
}

.publ-btn{
  a {
    background-color: var(--color-1);
    border: none;
    outline: none;
    padding: 5px 20px;
    border-radius: var(--borderRadius);
    color: var(--color-2);
  }
}


@media (min-width: 991px) {
.container-publisher {
    padding: 5px;
    
    .author {
    font-size: 20px;
}
}

.publ-btn{
  a {
    font-size: 15px;
  }
}
}
@media (max-width: 991px) {
.container-publisher {
    padding: 5px;
    .author {
    font-size: 18px;
}

  .img-container {
  position: relative;
  width: 100px;
  height: 100px;

    }
}

.publ-btn{
  a {
    font-size: 15px;
  }
}
}

/* Medium devices (tablets) */
@media (max-width: 767px) {
.container-publisher {
    padding: 5px;
    svg {
        font-size: 40px;
    }
}  

.publ-btn{
  a {
    font-size: 12px;
  }
}
}

`

export default PublishersSlide

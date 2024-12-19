import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'
import {FilmsTest} from '../../index'
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle  } from "react-icons/io";
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";
import moment from 'moment';



const PlatformDisplayData = ({list, newPost, setNewPost, setSelectedList, itemName, displayedList, setDisplayedList, handleDeleteData}) => {
  const [updatedList, setUpdatedList] = useState(displayedList)

    // const deleteItem = (id) => {
    //   setUpdatedList(updatedList.filter(item => item._id !== id))
    // }

    const settings = setting
    const actionOnClick = (action, index, item) => {

      if(action == 'left'){
        let newArray =  displayedList.filter((elem) => elem !== item)
        // indexNumber = 
        newArray.splice(index , 0, item)
        setDisplayedList([...newArray])
      }

      if(action == 'right'){

        let newArray =  displayedList.filter((elem) => elem !== item)
        newArray.splice(index + 2, 0, item)
        setDisplayedList([...newArray])
      }

      if(action == 'delete'){
        let newArray = displayedList.filter((elem) => elem !== item)
        setDisplayedList([...newArray])
      }
    } 

    useEffect(() => {
      setUpdatedList(displayedList)
    },[ , displayedList])
    
  // console.log(updatedList)
  return (
    <Wrapper>
    <div className='platform-display-data'>
    <Slider {...settings}>
          {updatedList?.sort((a, b) => a?.position - b?.position || 
          a[itemName]?.position - b[itemName]?.position
        )?.map((item, index) => {
          const { _id, promo, contentType, coverImage} = item;
          let displayPeriodStart = item?.displayPeriodStart || item[itemName]?.displayPeriodStart
          let displayPeriodEnd = item?.displayPeriodEnd || item[itemName]?.displayPeriodEnd 
          let position = item?.position || item[itemName]?.position 
          let display = item?.display || item[itemName]?.display 
          let file = item?.file || coverImage?.name
          
          // console.log(newPost?.contentId)
          return (
            <div  key={index} className='platform-display'>
                <FilmsTest film={{...item, display: display, index: position}} platform={true} />
                <div className='dispay-info'>
                    <p className='m-0'> 
                    from: {displayPeriodStart  ? moment(displayPeriodStart).format("YYYY-MM-DD HH:mm") : ''}
                      </p>
                    <p className='m-0'>to: {displayPeriodEnd ? moment(displayPeriodEnd).format("YYYY-MM-DD HH:mm") : ''}</p>
                    <div className='action-btn d-flex my-1 justify-content-around w-50'>
                    <FaRegEdit FaRegEdit className='text-primary' 
                    onClick={() => {
                      setNewPost({
                        displayPeriodStart: displayPeriodStart?.toString()?.slice(0, 16) || '',
                        displayPeriodEnd: displayPeriodEnd?.toString()?.slice(0, 16) || '',
                        position: position,
                        display: display,
                        contentId: _id,
                        promo: promo || undefined,
                        coverImage: { name: file},
                        updateItem: true,
                        itemName: itemName
                      })

                      setSelectedList([{
                        displayPeriodStart: displayPeriodStart?.toString().slice(0, 16) || '',
                        displayPeriodEnd: displayPeriodEnd?.toString().slice(0, 16) || '',
                        position: position,
                        display: display,
                        promo: promo,
                        coverImage: { name: file},
                        itemName: itemName,
                        contentType: contentType
                      }])
                    }} 
                    />
                    <FaTrashAlt className='text-danger' onClick={() => handleDeleteData(_id, itemName, itemName === 'landingCarousel' ?  `${_id}/delete` : 'delete' , contentType)}/>            
                    </div>
                </div>
             </div>
          );
        })}
        </Slider>
    </div>
    </Wrapper>)
}

const Wrapper = styled.main`
.platform-display-data{
    padding: 10px;
    background-color: var(--color-6);
    .platform-display{
        /* border: solid 1px var(--color-2); */
        .dispay-info{
            p{
                color: var(--color-2);

            }
            .action-btn{
                svg{
                    color: var(--color-12);
                    cursor: pointer;
                }
                svg:hover{
                    color: var(--color-2);
                }
            }
        }
    }

}


.platform-display > div {
    display: flex;
    flex-direction: column;
    justify-content: center !important;
    align-items: center;
    height: 100%;
    width: 100%;
}
/* Extra large devices (large desktops) */
@media (min-width: 992px) {
}
.platform-display-data{
  height: 24vw !important;
}
/* Large devices (desktops) */
@media (max-width: 991px) {
  .platform-display-data{
  height: 100% !important;
}
}

/* Medium devices (tablets) */
@media (max-width: 767px) {

}

@media (max-width: 576px) {

}

@media (max-width: 366px) {
}
`

export default PlatformDisplayData


const setting = {
  dots: false,
  arrows: true,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 6,
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
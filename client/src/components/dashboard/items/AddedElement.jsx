import React from 'react'
import styled from 'styled-components'
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";
import useWindowResize from '../../../hooks/useWindowResize'
// import {list} from '../../../data/carousel'
import {FilmsTest} from '../../index'

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'

const AddedElement = ({rowsNumber, list, newPost, inputId, getPost, change, affilIndex,
   handleType, handleFunctionDelete, inputChange}) => {
  const {width} = useWindowResize()
  const settings = {
    infinite: false,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    // fade: false,
    // autoplay: false,
    // autoplaySpeed: 8000,
    arrows: true,

  };
  
  const mainFuntionEdit = (elem) => {
    handleFunctionDelete(handleType,'edit', elem)
    affilIndex(elem)
  }

  const mainFuntionDelete = (elem) => {
    handleFunctionDelete(handleType,'delete', elem)
  }

  const listKeys = list.length !== 0 ? Object.keys(list[0]) : [];
  // console.log(list)
  return (
    <Wrapper>
       {inputId === 'chapterDesc' ? (newPost.chapterBlocked !== 'Locked' && newPost.chapterType === 'Typing') && 
       <textarea className='form-control my-2' id={inputId} value={newPost.chapterDesc}
       onChange={(e) =>getPost(e, change)} placeholder='Chapter Description'></textarea> : ''
      }
        {/*Show only if there content in array  */}
       {(list.length > 0 &&  Object.keys(list[0]).length !== 0) &&
      <div>
     
    
 {width <=767 ? 
      
      <div className='added-element-container p-3  my-1  w-100 '>
        <Slider {...settings}>
      {list?.map((item, index) => {
       return(
         <div key={index} className="rows">
           {listKeys?.map((i, index) => {
             return(
               <div  className={item[`${i}`] == '' ? 'd-none' : 'col'} key={index}>
                <span className='added-element form-control'
                >{item[`${i}`]}</span>
                 </div>
             )
           })}
             <div className= 'action-icon form-control '>  
               <FaRegEdit className=''
               onClick={() => mainFuntionEdit(
                handleType == 'bookChapter' ? item.chapterNumber :
                handleType == 'bookAffiliate' ? index :
                null
              )}/>
               <FaTrashAlt 
                onClick={() => mainFuntionDelete(
                  handleType == 'bookChapter' ? item.chapterNumber :
                  handleType == 'bookAffiliate' ? index :
                  null
                )}
               />
             </div>  
     </div>
  )})} 
  </Slider>
     </div>
    
    
    : 
  
    <div className='added-element-container p-3  my-1  w-100 '>
    
     {list?.sort((a, b) => a.chapterNumber - b.chapterNumber).map((item, index) => {
      return(
        <div key={index} className="row">
          {listKeys?.map((i, index) => {
            return(
              <div className={item[`${i}`] == '' ? 'col' : 'col'} key={index}>
                 <span className='added-element form-control'>{item[`${i}`]}</span>
           
                </div>
            )
          })}
            <div className= 'action-icon form-control '>  
              <FaRegEdit className=''
                onClick={() => mainFuntionEdit(
                  handleType == 'bookChapter' ? item.chapterNumber :
                  handleType == 'bookAffiliate' ? index :
                  null
                )}
              />
              <FaTrashAlt 
              onClick={() => mainFuntionDelete(
                handleType == 'bookChapter' ? item.chapterNumber :
                handleType == 'bookAffiliate' ? index :
                null
              )}
              />
            </div>  
    </div>
        
      )
     }
     
    )} 
    
    </div>
     }
     
    
     </div>
} 
    </Wrapper>)
}

const Wrapper = styled.main`
.added-element-container{
    background-color: var(--color-6);
    border-radius: var(--borderRadius);

    .added-element{
      /* background-color: var(--color-6); */
      background-color: var(--color-1);
    }

    .action-icon{
      display: flex;
      justify-content: space-around;
      align-items: center;
      background-color: var(--color-5);
      svg{
        color: var(--color-12);
      }
      svg:hover{
        color: var(--color-4);
    }
}
}

.action-icon{
  display: flex;
  justify-content: space-around;
  align-items: center;
  svg{
    color: var(--color-12);
  }
  svg:hover{
    color: var(--color-4);
  }
}
/* Extra large devices (large desktops) */
@media (min-width: 992px) {
.action-icon{
  width: 195px;
}
}
/* Large devices (desktops) */
@media (max-width: 991px) {
  .action-icon{
  width: 95px;
}

}

/* Medium devices (tablets) */
@media (max-width: 767px) {
.added-element-container{
    /* margin: 5px 0px; */
    .added-element{
      background-color: var(--color-1);
      p{
        background-color: var(--color-6);
      }
    }
    .action-icon{
      width: 100%;

      span{
   
      }
    }
}

.slick-prev {
    left: -20px;
    z-index: 1;
}

.slick-next {
    right: -20px;
}
.slick-prev::before, .slick-next::before{
    color:  var(--color-12);
}
}

@media (max-width: 576px) {

}

@media (max-width: 366px) {
}
`

export default AddedElement


const setting = {
  dots: false,
  arrows: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
};
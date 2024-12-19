import React from 'react'
import styled from 'styled-components'
import { FaTrashAlt, FaRegEdit,  FaLock, FaLockOpen, FaUpload } from "react-icons/fa";
import useWindowResize from '../../../../hooks/useWindowResize'
// import {list} from '../../../data/carousel'
import {FilmsTest} from '../../../index'

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'

const AddedElementVideo = ({currentUser, rowsNumber, setPlatformImage, list, handleFileUpload, newPost, inputId, getPost, change, affilIndex,
   handleType, contentType, handleFunctionDelete, setItem_Id, item_Id, setEditMode, setUpdateObj, inputChange}) => {
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
    setItem_Id(elem[0])
    setEditMode(true) 
    handleType === 'bookContent' && setUpdateObj(elem[1])
    handleType === 'courseContent' && setUpdateObj(elem[1])
    handleType === 'platform' && setUpdateObj(elem[1])
  }

  const mainFuntionDelete = (elem) => {
    // setItem_Id(elem)
    // item_Id !== '' && handleFunctionDelete( undefined,'delete', elem)

    handleFunctionDelete( undefined,'delete', elem)
  }

  const listKeys = list?.length !== 0 ? 
  (handleType === 'bookContent' || handleType === 'courseContent') ?  ['chapterTitle', 'chapterLocked', 'contentFormat'] : 
  handleType === 'platform' ? 
  (currentUser?.role === 'admin' && contentType === 'book') ? ['platformName', 'platformNameNotListed', 'bookLink', 'imaginarioBookLink' , 'platformImage'] :
  (currentUser?.role === 'admin' && contentType === 'course') ? ['platformName', 'platformNameNotListed', 'courseLink', 'imaginarioCourseLink' , 'platformImage'] :
  contentType === 'book' ? ['platformName', 'platformNameNotListed', 'bookLink'] : 
  ['platformName', 'platformNameNotListed', 'courseLink'] : 
  [] : []
  
  //  ['platformName', 'platformNameNotListed', 'bookLink', 'imaginarioBookLink' , 'platformImage']
// console.log(list)
  return (
    <Wrapper>
       {inputId === 'videoDesc' ? (newPost.videoLocked !== 'Locked' && newPost.contenFormat === 'Description') && 
       <textarea className='form-control my-2' id={inputId} value={newPost.videoDesc}
       onChange={(e) =>getPost(e, change)} placeholder='Chapter Description'></textarea> : ''
      }
        {/*Show only if there content in array  */}
       {(list?.length > 0 &&  Object.keys(list[0])?.length !== 0) &&
      <div>
     
    
 {width <=767 ? 
      
      <div className='added-element-container p-3  m-1  w-100 '>
        <Slider {...settings}>
      {list?.sort((a, b) => a - b).map((item) => {
        const { _id } = item
       return(
         <div key={_id} className="rows">
           {listKeys?.map((i, index) => {
             return(
               <div  className={item[`${i}`] == '' ? 'd-none' :  
               i == 'moduleLanguage' ? 'd-none' :
               i == 'bookLanguage' ? 'd-none' :
               i == 'contentLanguage' ? 'd-none' :
               'col'} 
               key={index}>
                <span className={i === 'platformNameNotListed' ? item?.platformListed ? 'added-element form-control' : 'added-element form-control bg-danger' : 'added-element form-control'}>  
                {i == "moduleTitle"  ? item[`${i}`]?.slice(0, 15) :
                  i == "chapterTitle" ? item[`${i}`]?.slice(0, 15) :
                  i == "chapterLocked" ? item[`${i}`] === false ? <FaLock className='text-danger'/> : <FaLockOpen className='text-success'/> :
                  i == "platformNameNotListed" ? item?.platformListed ? 'Listed' : 'No List' :
                  i == "contentFormat" ? item[`${i}`] === 'PDF' ? `PDF - Starting page: ${item[`startingPage`]}` : 
                  i == "contentFormat" ? item[`${i}`] === 'PDF' ? `PDF - Starting page: ${item[`startingPage`]}` : `Video` : ""  :
                  i == "platformName" ? item?.platformName !== 'Not Found' ? item?.platformName : item?.platformNameNotListed :
                 i == "platformImage" && item?.platformName === 'Not Found' ? <div className='d-flex'>
                   <input type='file' className='w-75'  accept="image/*" onChange={(e) => setPlatformImage(e.target.files[0])}/>
                   <button type='button' className='platform-image'>
                     {item?.imageName ? <FaTrashAlt onClick={() => handleFileUpload('delete-plat-image', _id)}/> : 
                       <FaUpload onClick={() => handleFileUpload('upload-plat-image', _id)}/>}
                       </button></div> :
                  item[`${i}`]
                    }
                  </span>
                 </div>
             )
           })}
             <div className= 'action-icon form-control '>  
             <button className='bg-transparent border-0'>
              <FaRegEdit className=''
                onClick={() => mainFuntionEdit(
                  handleType == 'courseContent' ? [_id, item] :
                  handleType == 'bookContent' ? [_id, item] :
                  handleType == 'platform' ? [_id, item] :
                  null
                )}
              />
              </button>  
              <button className='bg-transparent border-0'
               disabled={
                (handleType === 'bookContent' || handleType === 'courseContent') ? item['bookTitle'] == 'Introduction' ? true : false : false
               }>
              <FaTrashAlt 
              onClick={() => mainFuntionDelete(
                handleType == 'courseContent' ? _id :
                handleType == 'bookContent' ? _id :
                handleType == 'platform' ? _id :
                null
              )}
              />
              </button>
             </div>  
     </div>
  )})} 
  </Slider>
     </div>
    
    
    : 
  
    <div className='added-element-container p-3  m-1  w-100 '>
    
     {list?.sort((a, b) => a - b).map((item) => {
      const { _id } = item
      return(
        <div key={_id} className="row">
          {listKeys?.map((i, index) => {
            return(
              <div className={item[`${i}`] == '' ? 'col' : 
              i == 'moduleLanguage' ? 'd-none' :
              i == 'bookLanguage' ? 'd-none' :
              i == 'contentLanguage' ? 'd-none' :
              'col'} 
              
              key={index}>
                  <span className={i === 'platformNameNotListed' ? item?.platformListed ? 'added-element form-control' : 'added-element form-control bg-danger' : 'added-element form-control'}>
                  {i == "moduleTitle"  ? item[`${i}`]?.slice(0, 15) :
                   i == "chapterTitle" ? item[`${i}`]?.slice(0, 15) :
                   i == "chapterLocked" ? item[`${i}`] === false ? <FaLock className='text-danger'/> : <FaLockOpen className='text-success'/> :
                   i == "platformNameNotListed" ? item?.platformListed ? 'Listed' : 'No List' :
                   i == "contentFormat" ? item[`${i}`] === 'PDF' ? `PDF - Starting page: ${item[`startingPage`]}` : 
                   i == "contentFormat" ? item[`${i}`] === 'PDF' ? `PDF - Starting page: ${item[`startingPage`]}` : `Video` : ""  :
                   i == "platformName" ? item?.platformName !== 'Not Found' ? item?.platformName : item?.platformNameNotListed :
                  i == "platformImage" && item?.platformName === 'Not Found' ? <div className='d-flex'>
                    <input type='file' className='w-75'  accept="image/*" onChange={(e) => setPlatformImage(e.target.files[0])}/>
                    <button type='button' className='platform-image'>
                      {item?.imageName ? <FaTrashAlt onClick={() => handleFileUpload('delete-plat-image', _id)}/> : 
                        <FaUpload onClick={() => handleFileUpload('upload-plat-image', _id)}/>}
                        </button></div> :
                   item[`${i}`]
                   
                    }
                  </span>
           
                </div>
            )
          })}
            <div className= 'action-icon form-control '>
              <button className='bg-transparent border-0'>
              <FaRegEdit className=''
                onClick={() => mainFuntionEdit(
                  handleType == 'courseContent' ? [_id, item] :
                  handleType == 'bookContent' ? [_id, item] :
                  handleType == 'platform' ? [_id, item] :
                  null
                )}
              />
              </button>  
              <button className='bg-transparent border-0'
               disabled={
                (handleType === 'bookContent' || handleType === 'courseContent') ? item['bookTitle'] == 'Introduction' ? true : false : false
               }>
              <FaTrashAlt 
              onClick={() => mainFuntionDelete(
                handleType == 'courseContent' ? _id :
                handleType == 'bookContent' ? _id :
                handleType == 'platform' ? _id :
                null
              )}
              />
              </button>
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
      button{
        svg{
        color: var(--color-12);
      }
      svg:hover{
        color: var(--color-4);
    }
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

.platform-image{
  border: none;
  background-color: transparent;
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

export default AddedElementVideo


const setting = {
  dots: false,
  arrows: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
};
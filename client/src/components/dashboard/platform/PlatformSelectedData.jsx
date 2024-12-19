import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import Slider from 'react-slick'
import {PlatformDisplayData} from '../../index'
import { FaRegEdit } from "react-icons/fa";
import { FaStar, FaBook, FaPlay, FaMicroblog, FaUserEdit  } from 'react-icons/fa'
import {InputsVideo, SelectsVideo, InputNumber, InputDateTimeVideo} from '../../index'
import { toast } from 'react-toastify';
import {axiosInstance} from '../../../fetch/axiosConfig'

const PlatformSelectedData = ({list, setShowFilterPlatform,  FetchedDataItems,
    showFilterPlatform, newPost, setNewPost, getPost, selectedList, setSelectedList, itemName, displayedList, setDisplayedList}) => {
    const settings = setting
    const [show, setShow] = useState(false)
    const [loadingSave, setLoadingSave] = useState(false);
    const [dataArray, setDataArray] = useState([]);
    
    const showHide = () => {
        setShow(!show)
        setShowFilterPlatform(!showFilterPlatform)
    }
    const handleSaveData = async (id, field, action, contentType) => {
        
        if (loadingSave === true) return; // Prevent multiple clicks
      
        setLoadingSave(true);
        
        try {
          const res = await axiosInstance.put(action ? field === 'landingCarousel' ? `/platform/66cf81afde6fd63d681b8dd0/${field}/${action}`: `/${contentType}s/${id}/${field}/${action}` : field === 'landingCarousel' ? `/platform/66cf81afde6fd63d681b8dd0/${field}` : `/${contentType}s/${id}/${field}` , newPost);
            setLoadingSave(false);
            toast.success('Success Update!')
            setSelectedList([])
            setNewPost({})
            setDataArray(res?.data?.data)
        } catch (error) {
          console.error('Error saving data:', error);
          setLoadingSave(false);
          toast.error(error?.response?.data?.error || error?.message)
        }
      };

      const handleDeleteData = async (id, field, action, contentType) => {
    
        if (loadingSave === true) return; // Prevent multiple clicks
      
        setLoadingSave(true);
        
        try {
          await axiosInstance.put( field === 'landingCarousel' ? `/platform/66cf81afde6fd63d681b8dd0/${field}/${action}`:`/${contentType}s/${id}/${field}/${action}`);
          setLoadingSave(false);
          toast.success('Data Deleted Successfully!')
          setDataArray(dataArray.filter(item => item._id !== id))
      
        } catch (error) {
          console.error('Error saving data:', error);
          setLoadingSave(false);
          toast.error(error?.response?.data?.error || error?.message)
        }
      };
    const cancelSave = () => {
        setSelectedList([])
        setNewPost({})
    }

useEffect(() => {
    setDataArray(FetchedDataItems?.data?.length > 0 || FetchedDataItems?.length > 0 ? itemName === 'landingCarousel' ? FetchedDataItems?.filter(item => item?.position > 0 ) : FetchedDataItems?.data?.filter(item => item[itemName]?.position > 0) : [])
}, [ , FetchedDataItems])
    // console.log(selectedList)  
  return (
    <Wrapper>
    <div className={show ? 'platform-selected-data platform-selected-data-show ' : 'platform-selected-data platform-selected-data-show'}>

    <Slider {...settings}>
          {selectedList?.filter(item => item.itemName === itemName)?.map((item, index) => {
          const { coverImage, profileImage, contentType} = item;
          return (
                <div key={index} className='platform-selected'>
                    <img src={(!coverImage?.name && !profileImage?.name) ? import.meta.env.VITE_BACKEND_IMAGE_URL+'/no-img-user.png' : `${import.meta.env.VITE_BACKEND_IMAGE_URL}/${coverImage?.name || profileImage?.name}` }/>
                    <div className='selected-info d-flex flex-column px-2'>
                        <div className='selected-details d-flex flex-column'>
                            <span className='d-flex justify-content-between w-100'>
                                <span>From:</span>
                                <input className="mb-2 w-75" type="datetime-local" id="displayPeriodStart"  value={newPost?.displayPeriodStart} onChange={(e) =>getPost(e)}/>
                                </span>
                            <span className='d-flex justify-content-between w-100'>
                                <span>To:</span>
                                <input className="mb-2 w-75" type="datetime-local" id="displayPeriodEnd"  value={newPost?.displayPeriodEnd} onChange={(e) =>getPost(e)}/>
                            </span>
                            <span className='d-flex justify-content-between w-100'>  
                            <span>Position:</span>
                            <input className='w-50 p-0 m-0' type='number' min="1" id="position"  value={newPost?.position} onChange={(e) =>getPost(e)} />
                            </span>
                            <div className='d-flex w-100 mb-2'>
                                <div className='w-50'>
                                    <span>Display:</span>
                                    <select className='w-100 p-0 m-0' id="display"  value={newPost?.display} onChange={(e) =>getPost(e)}>
                                    <option value='false'>False</option>
                                    <option value='true'>True</option>
                                    </select>
                                </div>
                                <div className='w-50'>
                                <span>Promotion:</span>
                                <input className='w-100 p-0 m-0' type='number' min="1" id="promo" value={newPost?.promo} onChange={(e) =>getPost(e)} disabled={newPost?.itemName !== 'landingCarousel'}/>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between action-btn'>
                        {contentType == 'book' ? <FaBook /> :
                        contentType == 'course' ? <FaPlay /> :
                        contentType == 'user' ? <FaUserEdit  /> :
                        contentType == 'blog' ? <FaMicroblog /> : ''
                        }
                            <div className='d-flex'>
                            <button className='mx-3' onClick={cancelSave}>Cancel</button>
                            <button onClick={() => handleSaveData(newPost?.contentId, newPost?.itemName, newPost?.updateItem ? newPost?.itemName === 'landingCarousel' ?  `${newPost?.contentId}/update` : 'update' : undefined, contentType)}>
                            {newPost?.updateItem ? 'Update' : 'Select'}
                            </button>
                            </div>
                            
                        </div>
                    </div>
                </div>
          );
        })}
        </Slider>
    </div>

    <div className='edit-btn d-flex flex-column justify-content-end my-2'>
        <div className='edit-btn d-flex justify-content-end'>
        <button type='button' onClick={showHide}>{show ? 'Close' : 'Edit'} <FaRegEdit /></button>
        </div>
        
        {(dataArray?.length > 0) && 
        <div className='counter d-flex justify-content-end align-items-center mt-2'>
        <span>{dataArray?.length}</span>
        </div>
    }
    </div>
    <PlatformDisplayData list={list}
    // displayedList={displayedList} 
    displayedList={dataArray} 
    setDisplayedList={setDisplayedList}
    handleDeleteData={handleDeleteData}
    setNewPost={setNewPost}
    newPost={newPost}
    setSelectedList={setSelectedList}
    itemName={itemName}
    />
    
    </Wrapper>)
}

const Wrapper = styled.main`
.platform-selected-data{
    padding: 10px;
    background-color: var(--color-12);
    display: none;
  
    .platform-selected{
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        height: 190px;
        background-color: var(--color-7);
        border-radius: var(--borderRadius);
        img{
            height: 100%;
            width: 40%;
            object-fit: cover;
            border-top-left-radius : var(--borderRadius);
            border-bottom-left-radius : var(--borderRadius);
        }
        .selected-info{
            height: 100%;
            width: 60%;
            padding: 10px;
            .selected-details{
                span{
                    color
                    input{
                    border: none;
                    outline: none;
                    background-color: var(--color-12);
                    color: var(--color-12);
                    }
                    select{
                        padding: 1px;
                    }
                }
                
            }
            .action-btn{
                margin-top: auto;
                button{
                    padding: 3px 6px;
                    border: none;
                    background-color: var(--color-12);
                    color: var(--color-1);
                    border-radius: var(--borderRadius);
                }
            }
        }
    }
}
.edit-btn{

    button{
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        padding: 2px 6px;
        background-color: var(--color-12);
        color: var(--color-1);
        border-radius: var(--borderRadius);
        svg{
            color: var(--color-4); 
            margin-left: 6px;
        }
    }
}
.counter{
        span{
            background-color: var(--color-6);
            padding: 3px;
            border-radius: var(--borderRadius);
        }
    }

.platform-selected-data-show{
    display: contents;
}
.slick-prev::before, .slick-next::before{
    color:  var(--color-12);
}

/* Extra large devices (large desktops) */
@media (min-width: 992px) {
.platform-selected-data{

    .platform-selected{
        width: 95% !important;
        img{

        }
        .selected-info{

            .selected-details{
                span{
                  
                    input{
                
                    }
                    select{
                        
                    }
                }
                
            }
            .action-btn{
             
                button{
               
                }
            }
        }
    }
}
}
/* Large devices (desktops) */
@media (max-width: 991px) {
    .platform-selected-data{

.platform-selected{
    width: 95% !important;
    img{

    }
    .selected-info{

        .selected-details{
            span{
              
                input{
            
                }
                select{
                    
                }
            }
            
        }
        .action-btn{
         
            button{
           
            }
        }
    }
}
}
}

/* Medium devices (tablets) */
@media (max-width: 767px) {
    .platform-selected-data{

.platform-selected{
    width: 100% !important;
    img{

    }
    .selected-info{

        .selected-details{
            span{
              
                input{
            
                }
                select{
                    
                }
            }
            
        }
        .action-btn{
         
            button{
           
            }
        }
    }
}
}
}

@media (max-width: 576px) {

}

@media (max-width: 366px) {
}
`

export default PlatformSelectedData
const setting = {
  dots: false,
  arrows: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
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
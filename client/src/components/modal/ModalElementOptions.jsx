import React, { useState } from 'react'
import styled from 'styled-components'
import moment from 'moment';
import { FaTimes, FaBookmark, FaBook, FaPlay, FaMicroblog, FaLink, FaThumbsUp, FaHandshake, FaShoppingCart } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { Link } from 'react-router-dom'
import {axiosInstance} from '../../fetch/axiosConfig'

const ModalElementOptions = ({item, closeModal, modalType, currentUser, getNotification, updateCart}) => {
  const {contentType, message, contentIdBook, notifiedId, notifyingId, type, action, username, coverImage, createdAt, cart, like, save, share, connection, author, contentIdCourse, title, genre, promotion, url, _id} = item
  const [loadingDelete, setLoadingDelete] = useState(false)
  let setUrl = contentIdBook ? `./publishers/${notifiedId}/book/` + contentIdBook?._id :
   contentIdCourse ? `./publishers/${notifiedId}/course/` + contentIdCourse?._id :
  type === 'connection' ? `./publishers/${notifiedId}` : undefined 


// Function to delete notifs
const deteteNotif = async (ItemId) => {
    if(loadingDelete) return 

    if(modalType === 'cart'){
        setLoadingDelete(true)
        updateCart(ItemId)
        try { 
            await axiosInstance.put(`/${contentType}s/${_id}/cart`);
          setLoadingDelete(false)

        } catch (error) {
          console.log(error);
          setLoadingDelete(false)
        }

    } else{
    const infoData = {
        notifId: [`${ItemId._id}`]
        }
    setLoadingDelete(true)
    getNotification(ItemId._id)
    try { 
      const res = await axiosInstance.delete(`/notifications/user/${currentUser?._id}/delete`, {data: infoData} );
      
      setLoadingDelete(false)
    //   console.log(res?.data?.data)
    } catch (error) {
      console.log(error);
      setLoadingDelete(false)
    }
}
  };


  
  return (
    <Wrapper>
    <div key={_id} className='notif-item d-flex flex-column w-100 '>
        <div className='uperNotif d-flex justify-content-between align-items-center mb-1'>
            <div className='svg-type d-flex justify-content-between align-items-center m-0 w-100 px-1'> 
                <span  className='m-0 p-0'>{message || `Added to cart ${moment(cart?.addedAt).fromNow()}`}</span>
                <span  className='m-0 p-0 align-items-center'>{
                action == 'like' ? <FaThumbsUp /> :
                action == 'save' ? <FaBookmark /> :
                action == 'share' ? <IoIosSend /> :
                action == 'connection' ? <FaLink /> :
                action == 'collab' ? <FaHandshake  /> :
                action == 'cart' ? <FaShoppingCart  /> :
                 ''}</span>
            </div>
            <button type='button' className='del-btn' onClick={() => deteteNotif(item)}><FaTimes /></button>
        </div>
        <div className='d-flex'>
        <img src={!coverImage?.name ? import.meta.env.VITE_BACKEND_IMAGE_URL+'/no-img-user.png' : `${import.meta.env.VITE_BACKEND_IMAGE_URL}/${coverImage?.name}`}/>
        <div className='notif-details w-100'>
            <p className='m-0 title'>{contentIdBook?.title || title ||  notifyingId?.username}</p>
            <p className='m-0'>{contentIdBook?.author || author || notifyingId?.role}</p>
            <p className='m-0 '>{modalType === 'cart' ? genre?.length > 2 ? `${genre?.slice(0,2).join(', ')}+` : genre?.slice(0,2).join(', '):  " " || notifyingId?.action === 'connection' ? notifyingId?.category?.length > 2 ? `${notifyingId?.category?.slice(0,2).join(', ')}+` : notifyingId?.category?.slice(0,2).join(', ') : contentIdBook?.genre?.length > 2 ? `${contentIdBook?.genre?.slice(0,2).join(', ')}+` :  contentIdBook?.genre?.slice(0,2).join(', ') }</p>
            <div className='p-0  svg-type d-flex justify-content-between w-100'>
            <span className='m-0 p-0'>
            {
            contentType == 'book' ? <FaBook />:
             type == 'book' ? <FaBook /> :
            //  action == 'like' ? <FaThumbsUp /> :
             contentType == 'course' ? <FaPlay />:
             type == 'course' ? <FaPlay /> :
             type == 'blog' ? <FaMicroblog /> :
             type == 'connection' ? <FaLink /> :
             type == 'share' ? <IoIosSend /> :
             type == 'system' ? <IoIosSend /> :
             ''}
            </span>
            {(contentIdBook?.promotion?.reduction || promotion?.reduction) && <span className='m-0 promo'>{contentIdBook?.promotion?.reduction || promotion?.reduction}%</span>}
            </div>
            
            <div className='d-flex justify-content-between align-items-center w-100'>
            <Link to={setUrl} onClick={closeModal} className='p-0 d-flex bg-transparent'>
            <button type='button' className='buy-btn'>
            {
            modalType == 'cart' ? 'Buy Now':
            type == 'book' ? 'Visit Book':
             type == 'course' ? 'Watch Now' :
             type == 'video' ? 'Watch Now' :
             type == 'blog' ? 'Read Now' :
             type == 'connection' ? 'Visit Profile' :
             type == 'share' ? 'Visit' :
             type == 'system' ? 'Visit' :
             ''}
            </button>
            </Link>   
            <span className='date'>{modalType == 'cart' ? 
            moment(cart?.addedAt).isSame(moment(), 'year') ? moment(cart?.addedAt).format('D MMMM') : moment(cart?.addedAt).format('D MMMM YYYY') :
            moment(createdAt).isSame(moment(), 'year') ? moment(createdAt).format('D MMMM') : moment(createdAt).format('D MMMM YYYY')}
            </span>
            </div>
        </div>
        </div>
      </div>
    </Wrapper>)
}

const Wrapper = styled.main`
.uperNotif{

    div{
      background-color: var(--color-2);
      border-radius: var(--borderRadius);
      color: var(--color-1); 
      
    }
    button {
        background-color: transparent;
        border: none;
        margin-left: 10px;
        svg{
            color: var(--color-1); 
            transition: var(--transition);
        }
    }
    button:hover {
        svg{
            color: var(--color-4); 
        }
    }
}
.notif-item {
    margin-bottom: 15px;
    border-radius: var(--borderRadius);
    padding: 5px;
    background-color: var(--color-12);
    

    .notif-details{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
        /* height: 120px; */
        width: 80px;
        border-radius: var(--borderRadius);
        
        .title{
            white-space: nowrap;   /* Prevents the text from wrapping to the next line */
            overflow: hidden;      /* Hides the overflowed content */
            text-overflow: ellipsis; /* Adds the ellipsis ("...") */
            
            display: inline-block; /* Ensures the width is respected */
            /* font-size: px; */
            /* padding-top: 0px; */
        }
    }
    .svg-type{

        span {
            svg{
            color: var(--color-4);
        }
        }
        
        .promo {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: var(--color-4);
            border-radius: 50%;
            padding: 2px;
            font-size: 12px;
            color: var(--color-1);
        }
    }
    a{
    .buy-btn{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--color-1);
        border: none;
        color: var(--color-2);
        margin-top: auto;
        border-radius: var(--borderRadius);
        cursor: pointer;
        transition: var(--transition);
    }
    .buy-btn:hover {
        background-color: var(--color-4);
        color: var(--color-1);
    }
    }

    .date{
        font-size: 10px;
        color: var(--color-6);
    }
}
/* Extra large devices (large desktops) */
@media (min-width: 992px) {
.uperNotif{
  /* background-color: var(--color-2); */
  div{
      font-size: 12px;
  }
  button {
      background-color: transparent;
      border: none;
      svg{
          /* color: var(--color-1) !important;  */
      }
  }
}

.notif-item {
    .notif-details{
        height: 90px;
        p{
            font-size: 10px;
        }
    }

    img{
        height: 90px;
        width: 60px;
        object-fit: cover;
        margin-right: 10px;
    }
    .svg-type{
        span {
            svg{
            color: var(--color-4);
            font-size: 10px;
        }
        }
        .promo {
            font-size: 10px;
            padding: 1px;
            
        }
    }
    a{
    .buy-btn{
        width: 100%;
        padding: 1px 8px;
        font-size: 10px;
    }
}
}
}
/* Large devices (desktops) */
@media (max-width: 991px) {
  .uperNotif{
/* background-color: var(--color-2); */
div{
    font-size: 12px;
}
button {
    background-color: transparent;
    border: none;
    svg{
        /* color: var(--color-1) !important;  */
    }
}
}
.notif-item {
      img{
      height: 100px;
      width: 70px;
      object-fit: cover;
      margin-right: 10px;
  }
  .svg-type{
      .promo {
          background-color: var(--color-4);
          border-radius: 50%;
          padding: 2px;
          
      }
  }
  .buy-btn{
      width: 100px;
  }
  .buy-btn:hover {
     
  }
}
}

/* Medium devices (tablets) */
@media (max-width: 767px) {
.notif-item {
  img{
      height: 80px;
      width: 70px;
      object-fit: cover;
      margin-right: 10px;
  }
  .notif-details{
      height: 80px;
      .title{
          font-size: 10px;
      }
  }
  
  .svg-type{
      span {
          svg{
          color: var(--color-4);
          font-size: 10px;
      }
      }
      .promo {
          font-size: 8px;
          padding: 1px;
          
      }
  }
  .buy-btn{
    }
    .buy-btn:hover {

    }
}
}

@media (max-width: 576px) {

}

@media (max-width: 366px) {
}
`

export default ModalElementOptions

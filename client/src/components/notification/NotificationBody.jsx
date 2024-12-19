import React from 'react'
import styled from 'styled-components'
import { FaTimes, FaBook, FaPlay, FaMicroblog, FaLink } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { Link } from 'react-router-dom'
import {UseGeneralContext} from '../../mainIndex'

const NotificationBody = ({list}) => {
    const {closeModal} = UseGeneralContext()
  return (
    <Wrapper>
    <div className='notif-body container d-flex flex-column justify-content-start align-items-center w-100 '>
        
        {list.map((item) => {
            const {id, title, contentType, image, url} = item
            return (
                <div key={id} className='notif-item d-flex flex-column w-100'>
                    <div className='uperNotif d-flex justify-content-between align-items-center mb-1 px-1'>
                        <div className='m-0'>
                        {contentType == 'book' ? 'New book you may like':
                         contentType == 'video' ? 'New video you may like' :
                         contentType == 'blog' ? 'New blog you may like' :
                         contentType == 'connection' ? 'You have a new connect request' :
                         contentType == 'share' ? 'Rogerio recommended for you' :
                         ''}
                        </div>
                        <button type='button' ><FaTimes /></button>
                    </div>
                    <div className='d-flex'>
                    <img src={image}/>
                    <div className='notif-details w-100'>
                        <p className='m-0 title'>{title}</p>
                        <p className='m-0'>Rogerio</p>
                        <p className='m-0 '>Fiction</p>
                        <div className='p-0  svg-type d-flex justify-content-between w-100'>
                        <span className='m-0 p-0'>
                        {contentType == 'book' ? <FaBook />:
                         contentType == 'video' ? <FaPlay /> :
                         contentType == 'blog' ? <FaMicroblog /> :
                         contentType == 'connection' ? <FaLink /> :
                         contentType == 'share' ? <IoIosSend /> :
                         ''}
                        </span>
                        <span className='m-0 promo'>-20%</span>
                        </div>
                        <Link to={url + id} onClick={closeModal} className='p-0 d-flex bg-transparent'>
                        <button type='button' className='buy-btn'>
                        {contentType == 'book' ? 'Read Now':
                         contentType == 'video' ? 'Watch Now' :
                         contentType == 'blog' ? 'Read Now' :
                         contentType == 'connection' ? 'Visit Profile' :
                         contentType == 'share' ? 'Visit' :
                         ''}
                            </button>
                            </Link>
                    </div>
                    </div>
                </div>
            )
        })}
        
      
    </div>
    </Wrapper>)
}

const Wrapper = styled.div`
.notif-body{
    padding: 5px;
    overflow-y: scroll;
}
.uperNotif{
    background-color: var(--color-2);

    button {
        background-color: transparent;
        border: none;
        /* color: var(--color-2);  */
        svg{
            color: var(--color-1); 
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
    }
    .buy-btn:hover {
        background-color: var(--color-4);
        color: var(--color-1);
    }
    }
}

/* Extra large devices (large desktops) */
@media (min-width: 992px) {
.notif-body{
    height: 60vh;
}
.uperNotif{
    /* background-color: var(--color-2); */
    div{
        font-size: 12px;
    }

    button {
        background-color: transparent;
        border: none;
        svg{
            color: var(--color-1) !important; 
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
.notif-body{
    height: calc(100vh - 13rem);
}
.notif-item {
        img{
        height: 80px;
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
.notif-body{
    height: calc(100vh - 11rem);
}
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
export default NotificationBody

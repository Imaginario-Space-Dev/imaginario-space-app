import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { IoIosSend } from "react-icons/io";
import {useParams, useLocation } from 'react-router-dom';
import { FaBookmark, FaHeart, FaShoppingCart} from 'react-icons/fa';
import {UseGeneralContext} from '../../../mainIndex'
import {ProfileContentTrackHeader, LinkAndEditBtn} from '../../index';

const SingleBlogHeader = ({list, trackProfile, TrackName}) => {
    const {openModal, modalContent} = UseGeneralContext()

    const onClickShareButton = () => {
        openModal() 
        modalContent('share-blog')
      }

 return (
    <Wrapper>
        <div className='blog-header d-flex flex-column justify-content-center align-items-center mb-3'>
        <div className='w-100'>
        {trackProfile !== null && <ProfileContentTrackHeader TrackName={TrackName} path={trackProfile} />}
        {trackProfile == null && <LinkAndEditBtn /> }
        </div>
        

            <img src={list[0].image} alt={list[0].title}/>
            <h1 className='my-2'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h1>

            <div className='author-date d-flex justify-content-between align-items-center w-100 my-2'>
                <div className='author-info d-flex'>
                <img src={list[0].image} className='img-author'/>
                <div className='d-flex flex-column mx-3 justify-content-center'>
                    <p className='author m-0'>Rogerio Kusuti</p>
                    <p className='author-roll m-0'>CEO and Founder</p>
                    </div>
                </div>

                <div>
                <div className='blog-interact d-flex justify-content-between'> 
                    <span><FaHeart /> 29</span>
                    <span><FaBookmark /> 10</span>
                    <span onClick={onClickShareButton}><IoIosSend /> 19</span>  
                </div>
                <span className='align-self-center'>10 mins read | 17, June 2024</span>
                </div>
            </div>
            <div className='d-flex justify-content-end w-100'>
                <select className='' >
                    <option>EN</option>
                    <option>PT</option>
                    <option>FR</option>
                    <option>ES</option>
                </select>
            </div>
        </div>
    </Wrapper>)
}

const Wrapper = styled.div`
.blog-header{
    /* width: 100%; */
    h1{
        color: var(--color-2);
    }
    img{
        object-fit: cover;
    }
    .author-date{
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
        span{
            color: var(--color-9);
        }
        .blog-interact{
            svg{
                cursor: pointer;
            }
            svg:hover{
                color: var(--color-4);
            }
        }
    }
}
@media (min-width: 991px) {
.blog-header {
    img{
        height: 400px;
        width: 100%;
    }
    .author-date{
            .author-info{
            img{
                height: 60px;
                width: 60px;
            }
        }
        span{
            font-size: 14px;
        }
    }
}
}

@media (max-width: 991px) {
.blog-header{
    img{
        height: 400px;
        width: 100%;
    }
    .author-date{
            .author-info{
            img{
                height: 40px;
                width: 40px;
            }
        }
        span{
            font-size: 10px;
        }
    }
    .blog-content{
        font-size: 20px;
    }
}
}
/* Medium devices (tablets) */
@media (max-width: 767px) {
.blog-header{
    img{
        height: 400px;
        width: 100%;
    }
    h1 {
        font-size: 20px;
    }
    .author-date{
            .author-info{
            img{
                height: 40px;
                width: 40px;
            }
        }
        span{
            font-size: 10px;
        }
    }
    .blog-content{
        font-size: 15px;
    }
}
}
`

export default SingleBlogHeader

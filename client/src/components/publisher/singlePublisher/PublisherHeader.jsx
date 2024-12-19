import React, { useState } from 'react'
import styled from 'styled-components'
import {list} from '../../../data/carousel'
import {useParams } from 'react-router-dom';
import {ProfileContentTrackHeader} from '../../index';
import { FaBook, FaPlay, FaMicroblog, FaLink, FaBookmark, FaHeart} from 'react-icons/fa';
import { GiPapers} from 'react-icons/gi';
import { IoIosSend } from "react-icons/io";
import { GiClick } from "react-icons/gi";
import {UseGeneralContext, UseUserContext} from '../../../mainIndex'


const PublisherHeader = ({FetchedData, FetchedBook, FetchedCourse, mySpace}) => { 
    const {openModal, modalContent} = UseGeneralContext()
    const {currentUser} = UseUserContext()
    const { collaboratorId } = useParams();

// Check if fetched data exists
if (!FetchedData) return <p>Loading...</p>;
const {username, _id, category, profileImage, liked, save, share, connectedToMe, role, desc, collabs} = FetchedData
  return (
    <Wrapper>
        <div className='singlePublisher-container'>

        <ProfileContentTrackHeader mySpace={currentUser?._id === _id} currentUser={currentUser}/>

            <div className='header-container '>
                <div className='img-interactions'>
                <img src={profileImage?.name ? `${import.meta.env.VITE_BACKEND_IMAGE_URL}/${profileImage?.name}` : import.meta.env.VITE_BACKEND_IMAGE_URL+'/no-img-user.png'}/>
                </div>
                
                <div className='publisher-details'>
                    <h2 className='m-0 mb-1'>{username}</h2>
                    <p className='m-0 '>{category?.slice(0,2)?.join(', ')} {category?.length > 2 ? `+${category?.length - 2}` : ""}</p>
                    <p className='publ m-0 mb-1'>{role}</p>
                    <p className='m-0 mb-2'>{category?.slice(0,2)?.join(', ')}</p>
                    <p className='desc m-0 mb-1'><div dangerouslySetInnerHTML={{ __html: desc?.length > 200 ? `${desc?.slice(0,200)}...` : desc }} /> </p>
    
                    <div className='icons d-flex justify-content-around align-items-center'>
                        <span className='d-flex flex-column justify-content-center align-items-center'><FaBook /> <p className='m-0'>{FetchedBook?.filter(item => item?.createdBy === _id)?.length}</p></span>
                        <span className='d-flex flex-column justify-content-center align-items-center'><FaPlay /> <p className='m-0'>{FetchedCourse?.filter(item => item?.createdBy === _id)?.length}</p></span>
                        </div>

                    <span className='connect'>
                    <span className='m-0 my-2' onClick={() => {
                     modalContent('connection')
                     openModal(true)
                    }
                    }>{connectedToMe?.length }</span>
                    <button type='buttom'>Followers</button>
                    </span>
                    
                    
                </div>
            </div>
        
        </div>
    </Wrapper>)
}

const Wrapper = styled.main`
.singlePublisher-container {
    margin-top: 6rem;
    margin-bottom: 3rem;
}
.header-container{
    display: flex;
    justify-content: start;
    align-items: start;
    height: 20rem;
    

    
    .img-interactions {
        display: flex;
        flex-direction: column;

        img{
        object-fit: cover;
    }
    }
    

    .publisher-details {
        display: flex;
        flex-direction: column;
        height: 100%;

    
        svg{
            color: var(--color-1);
        }
        svg:hover{
            color: var(--color-4);
        }

        .connect{
            margin-top: auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            button {
            margin-top: auto;
            background-color: var(--color-1);
            color: var(--color-2);
            border: none;
            border-radius: var(--borderRadius);
        }
        button:hover {
            background-color: var(--color-4); 
            color: var(--color-1);
        }
        span {
                cursor: pointer;
            }
        }
    }

    
}

@media (min-width: 991px) {
.header-container{
    .img-interactions {
        display: flex;
        flex-direction: column;
        margin-right: 60px;
        height: 20rem;

        img{
        height: 100%;
        width: 200px;
        object-fit: cover;
    }

    }

    .publisher-details {
        width: 50%;
        
        .desc {
            height: 4rem;
            overflow-y: scroll;
        }
        button {
            padding: 2px;
            width: 30%;
            font-size: 15px;
            margin-bottom: 5px;
        }

        .icons{
            margin-top: auto;
            width: 20%;
            span{
                
                svg{
                font-size: 20px;
                cursor: pointer;
            }
            p{
                color: var(--color-1);
                font-size: 18px;
                margin-left: 10px;
            }
            }
            
        }
        .connect{
            width: 20%;
            span{
                font-size: 15px;
                color: var(--color-1);
                font-weight: bold;
            }
            button {
                width: 100%;
            }
        }
    }
}
}

@media (max-width: 991px) {
.header-container{
    height: 13rem;

    .img-interactions {
        margin-right: 20px;
        height: 12rem;

        img{
            height: 100%;
        width: 120px;
        object-fit: cover;
    }
    }
    .publisher-details {
        width: 40%;
        height: 12rem;

        .desc {
            display: none;
        }

        svg{
            color: var(--color-1);
            font-size: 20px;
        }
        svg:hover{
            color: var(--color-4);
        }

        .icons{
            margin-top: auto;
            width: 40%;
            span{
                svg{
                font-size: 15px;
                cursor: pointer;
            }
            p{
                color: var(--color-1);
                margin-left: 5px;
                font-size: 15px;
            }
            }
            
        }
        .connect{
            width: 40%;
            span{
                font-size: 12px;
                color: var(--color-1);
                font-weight: bold;
            }
            button {
            padding: 2px;
            width: 100%;
            font-size: 12px;
            margin-bottom: 5px;
        }
        }
    }
}
}

/* Medium devices (tablets) */
@media (max-width: 767px) {
.publisher-details {
        width: 100% !important;
        height: 12rem;

        .desc {
            height: 4rem;
            overflow-y: scroll;
        }
        .icons{
            width: 100% !important;
            span{
                svg{
              
            }
            p{
                color: var(--color-1);
                margin-left: 5px;
                font-size: 15px;   
            }
            }
        }

        .connect{
            width: 100% !important;
            span{
                font-size: 12px;
                color: var(--color-1);
                font-weight: bold;
            }
            button {
            padding: 2px;
            width: 80%;
            font-size: 12px;
            margin-bottom: 5px;
        }
        }
    }

}
`

export default PublisherHeader

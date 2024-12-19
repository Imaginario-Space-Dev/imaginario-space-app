import React, { useState } from 'react'
import styled from 'styled-components'
import {list} from '../../../data/carousel'
import {LinkAndEditBtn} from '../../index';
import { FaBook, FaPlay, FaMicroblog, FaLink} from 'react-icons/fa';
import { GiPapers} from 'react-icons/gi';
import { IoIosSend } from "react-icons/io";



const ProfileHeader = ({FetchedData}) => {
    

  // Check if fetched data exists
  if (!FetchedData) return <p>Loading...</p>;
  const {username, category, profileImage, connection, role, desc} = FetchedData
  return (
    <Wrapper>
        <div className='singlePublisher-container'>

        <LinkAndEditBtn sigleProfile={true}/>

            <div className='header-container '>
                <div className='img-interactions'>
                <img src={!profileImage?.name ? import.meta.env.VITE_BACKEND_IMAGE_URL+'/no-img-user.png' : `${import.meta.env.VITE_BACKEND_IMAGE_URL}/${ profileImage?.name}` } alt={profileImage?.name}/>
                </div>
                
                <div className='publisher-details'>
                    <h2 className='m-0 mb-1'>{username}</h2>
                    {/* <p className='m-0 '>Finance, management +2</p> */}
                    <p className='publ m-0 mb-1'>{role}</p>
                    <p className='m-0 mb-2'>{category.length > 0 && category.join(', ')}</p>
                    <p className='desc m-0 mb-1'><div dangerouslySetInnerHTML={{ __html: desc }} /></p>
                    {/* <div className='icons d-flex justify-content-between align-items-center'>
                        <span><FaBook /><span>2</span></span>
                        <span><FaPlay /><span>10</span></span>
                        <span><FaMicroblog /><span>5</span></span>
                        </div> */}
                    <span className='connect'>
                    {/* <FaLink /> */}
                    <span className='m-0 my-2'>{connection?.length }</span>
                    <button type='buttom'>Connect</button>
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
            width: 20%;
            font-size: 15px;
            margin-bottom: 5px;
        }

        .icons{
            margin-top: auto;
            width: 30%;
            span{
                
                svg{
                font-size: 20px;
                cursor: pointer;
            }
            span{
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
            /* width: 30%; */
            span{
                svg{
                font-size: 15px;
                cursor: pointer;
            }
            span{
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

export default ProfileHeader

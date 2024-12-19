import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {FaSearch,FaTimes} from 'react-icons/fa'
import {ModalBody} from '../index'
import {axiosInstance} from '../../fetch/axiosConfig'
import {useParams } from 'react-router-dom';

const ModalHeaderBuy = ({list, buyItem, currentUser, modalType}) => {
  const {coverImage,title, author, promotion, collabId} = buyItem
  const {userId} = useParams()
  const [filteredData, setFilteredData] = useState([])
  const [searchInput, setSearchInput] = useState('');
  const [londingShare, setLondingShare] = useState(false);
        
  useEffect(() => {
    (searchInput === '')  ? setFilteredData(list) :
    (searchInput !== '')  ? setFilteredData(list?.filter(item => item?.platformName.toLowerCase().includes(searchInput.toLowerCase()))) :
    []
  }, [ , searchInput])

  return (
    <Wrapper>
    <div className='upper-content'>

      <div className='upper d-flex justify-content-between align-items-center'>
        <div className='d-flex d-flex justify-content-center align-items-center w-50 mb-2'>
          <img src={!coverImage?.name ? import.meta.env.VITE_BACKEND_IMAGE_URL+'/no-img-user.png' : `${import.meta.env.VITE_BACKEND_IMAGE_URL}/${coverImage?.name}` } alt={title}/>
          <span className='w-100'>
            <span className='m-0'>{title}</span>
            <p className='m-0'>{author}</p>
          </span>
        </div>

        <span className='mx-3 '>copy link</span>
      </div>

      <div className='search d-flex d-flex justify-content-center align-items-center w-100 my-2'>
      <input type='text' className='search-input border' onChange={(e) => setSearchInput(e.target.value)}/>
      {/* <span></span> */}
      <FaSearch className='mx-3'/>
      </div>

    </div>
    
    <ModalBody list={filteredData} buyItem={buyItem} modalType={modalType}/>
    </Wrapper>)
}

const Wrapper = styled.main`
.upper-content{
  .upper{
      div{
        margin-right: 10px;
      img{
        height: 40px;
        width: 40px;
        object-fit: cover;
        margin-right: 5px;
      }
      span{
        span{
          font-size: 15px;
        }
        p{
          font-size: 10px;
        }
      }
    }
    span{
      color: var(--color-1);
      font-size: 10px;
    }

  }

  .search{
    background-color: var(--color-1);
    border-radius: var(--borderRadius);
    input{
      width: 100%;
      padding: 5px;
      outline: none;
      font-size: 13px;
      border: none;
      border-radius: var(--borderRadius);
    }
    svg{
      border: none;
    }
  }

  .item-selected{
    
    border-radius: var(--borderRadius);
    p{
      font-size: 10px;
      /* height: 100%; */
      height: 50px;
      background-color: var(--color-1);
      color: var(--color-2);
      padding: 5px 5px;
      border-bottom-left-radius: var(--borderRadius);
      border-top-left-radius: var(--borderRadius);
    }
    span{
      width: 100%;
      height: 40px;
      background-color: var(--color-2);
      padding: 0px 0px;
      overflow-x: scroll;
      p {
        height: 100%;
        padding: 2px 5px;
        background-color: var(--color-3);
        border-radius: var(--borderRadius);
        font-size: 10px;
        margin: 0px 5px;
        color: var(--color-1);
        border: 1px solid var(--color-9);
        cursor: pointer;
        white-space: nowrap;
      }
    }
    button{
      height: 50px;
    background-color: var(--color-1);
    color: var(--color-2);
    padding: 2px 5px;
    border: none;
    border-radius: var(--borderRadius);
  }
  button:hover{
    background-color: var(--color-4);
    color: var(--color-1);
  }
  }
}
/* Extra large devices (large desktops) */
@media (min-width: 992px) {

}
/* Large devices (desktops) */
@media (max-width: 991px) {

}

/* Medium devices (tablets) */
@media (max-width: 767px) {

}

@media (max-width: 576px) {

}

@media (max-width: 366px) {
}
`

export default ModalHeaderBuy

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {FaSearch,FaTimes} from 'react-icons/fa'
import {ModalBody} from '../index'
import {axiosInstance} from '../../fetch/axiosConfig'
import {useParams } from 'react-router-dom';

const ModalHeaderShare = ({list, currentUser, modalType, updateSharedItem}) => {
  const {coverImage, title, author, contentType} = list
  const {userId} = useParams()
  const [filteredData, setFilteredData] = useState([])
  const [selectedData, setSelectedData] = useState([])
  const [searchInput, setSearchInput] = useState('');
  const [londingShare, setLondingShare] = useState(false);
        
    // Build the query string based on category and language filters
    let query = '';  // Start with the base route

  if (searchInput !== '') {
    query += `search=${searchInput}`;
}

    
    let bodyData = {}
    let receverisId = []
    // check if it's a collab or not 
    if(userId){
        bodyData.collabId = list?.collabs?.filter(item => item.collaboratorId === userId)[0]?._id
        bodyData.receivers = receverisId
    } else {
      bodyData.receivers = receverisId
    }
   // Function to fetch data
   const fetchData = async () => {
    try { 
      const res = await axiosInstance.get(`/users?role=publisher&role=regular&role=collaborator&role=admin&${query}`);
      
    // Set the fetched data 
    setFilteredData(res?.data?.data?.filter(item =>  item.connection?.find(it => it.connectedId === currentUser?._id ) && item._id !== currentUser?._id));
  
    } catch (error) {
      console.log(error);
    }
  };

  // Function to fetch data
  const shareData = async () => {
    if(londingShare) return //Prenvent multiple clicks
    if(selectedData?.length === 0) return //abort if selectedData is equal 0
    setLondingShare(true)

    selectedData?.map(item => !receverisId.includes(item?._id) && receverisId.push(item?._id))
    bodyData.receivers = receverisId
   try { 
     const res = await axiosInstance.put(`/${contentType}s/${list?._id}/share`, bodyData);
     
   setLondingShare(false)
   setSelectedData([])
   updateSharedItem(res?.data?.data)
   } catch (error) {
     console.log(error);
     setLondingShare(false)
   }
};

  useEffect(() => {
    fetchData();
  }, [, searchInput]); // Empty dependency array ensures this runs only once

  // useEffect(() => {
  //   selectedData?.length > 0 && selectedData?.map(item => receverisId.push(item?._id))
  //   bodyData.receivers = receverisId
  //   console.log(receverisId)
  //   console.log(bodyData)
  // }, [selectedData]);


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

        <button type='button' className='' disabled={selectedData?.length === 0} onClick={shareData}>Share</button>
      </div>

      <div className='search d-flex d-flex justify-content-center align-items-center w-100 my-2'>
      <input type='text' className='search-input border' onChange={(e) => setSearchInput(e.target.value)}/>
      {/* <span></span> */}
      <FaSearch className='mx-3'/>
      </div>

      {selectedData?.length > 0 &&
      <div className='item-selected d-flex justify-content-between align-items-center w-100 my-2 p-0'>
        <p className='d-flex justify-content-center align-items-center m-0 px-2'>{selectedData?.length}</p>
          <span className='d-flex justify-content-start align-items-center'>
            {selectedData?.length > 0 && selectedData?.map(item => {
              return(<p className='d-inline' onClick={() => setSelectedData(selectedData.filter(elem => elem._id !== item._id))}>{item.username}</p>)
            })}  
          </span>
          <button type='button' onClick={() => setSelectedData([])}><FaTimes /></button>
      </div>
      }
    </div>
    
    <ModalBody list={filteredData} selectedData={selectedData} setSelectedData={setSelectedData} modalType={modalType}/>
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
  button{
    background-color: var(--color-1);
    color: var(--color-2);
    padding: 5px 10px;
    border: none;
    border-radius: var(--borderRadius);
    cursor: pointer;
  }
  button:hover{
    background-color: var(--color-4);
    color: var(--color-1);
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

export default ModalHeaderShare

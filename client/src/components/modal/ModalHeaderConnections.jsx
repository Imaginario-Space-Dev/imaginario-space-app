import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {FaSearch,FaTimes} from 'react-icons/fa'
import {ModalBody} from '../index'
import {axiosInstance} from '../../fetch/axiosConfig'
import {useParams } from 'react-router-dom';

const ModalHeaderConnections = ({currentUser, getCurrentUser, modalType, updateSharedItem}) => {
  const {userId} = useParams()
  const [filteredData, setFilteredData] = useState([])
  const [selectedData, setSelectedData] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [connectType, setConnectType] = useState(true)
  const [londingShare, setLondingShare] = useState(false);

useEffect(() => {
   // Function to auth User
   const fetchData = async () => {
    try{
      const res = await axiosInstance.get('/auth/me')
      getCurrentUser(res?.data?.data)
    } catch (error) {
      console.log(error);
    }
  };
  !londingShare && fetchData()
}, [ , connectType, londingShare])

useEffect(() => {
  (searchInput === '' && !connectType)  ? setFilteredData([...currentUser?.connectedToMe]) :
  (searchInput === '' && connectType)  ? setFilteredData([...currentUser?.connection]) : 

  (searchInput !== '' && connectType)  ? setFilteredData(currentUser?.connection?.filter(item => item?.connectedId?.username?.toLowerCase().includes(searchInput.toLowerCase()))) :
  (searchInput !== '' && !connectType)  ? setFilteredData(currentUser?.connectedToMe?.filter(item => item?.connectedId?.username?.toLowerCase().includes(searchInput.toLowerCase()))) :
  []
}, [ , searchInput, connectType, londingShare, currentUser])


  return (
    <Wrapper>
    <div className='upper-content'>
      <div className='search d-flex d-flex justify-content-center align-items-center w-100 my-2'>
      <input type='text' className='search-input border' onChange={(e) => setSearchInput(e.target.value)}/>
      {/* <span></span> */}
      <FaSearch className='mx-3'/>
      </div>

      <div className='connect-type-btn d-flex d-flex justify-content-around align-items-center w-100 my-2'>
        <button className={connectType ? 'button-active py-1 px-3' : 'py-1 px-3'} onClick={() => setConnectType(true)}>Following</button>
        <span>{filteredData?.length}</span>
        <button className={!connectType ? 'button-active py-1 px-3' : 'py-1 px-3'} onClick={() => setConnectType(false)}>Followers</button>
      </div>
    </div>
    
    <ModalBody list={filteredData} setLondingShare={setLondingShare} londingShare={londingShare} setFilteredData={setFilteredData} connectType={connectType} selectedData={selectedData} currentUser={currentUser} setSelectedData={setSelectedData} modalType={modalType}/>
    </Wrapper>)
}

const Wrapper = styled.main`
.upper-content{

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
  .connect-type-btn{
    button{
      border: none;
      background-color: var(--color-12);
      color: var(--color-1);
      border-radius: var(--borderRadius);
      border: solid 1px var(--color-12);
    }
    button:hover{
      border: solid 1px var(--color-4);
    }
    .button-active{
      border: solid 1px var(--color-4);
    }
    span{
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

export default ModalHeaderConnections

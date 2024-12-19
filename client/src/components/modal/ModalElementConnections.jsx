import React, { useState } from 'react'
import styled from 'styled-components'
import {axiosInstance} from '../../fetch/axiosConfig'


const ModalElementConnections = ({item, currentUser, setLondingShare, londingShare, connectType}) => {

  const [status, setStaus] = useState(false);
  const {profileImage, _id, role, category, username, spaceName} = item

    // Function Connect/Disconnet
    const ConnectAndDisconnet = async (userId) => {
      if(londingShare) return //Prenvent multiple clicks
      setLondingShare(true)
     try { 
       await axiosInstance.put(`/users/${userId}/connect`);
       setStaus(!status)
     setLondingShare(false)
     } catch (error) {
       console.log(error);
       setLondingShare(false)
     }
  };
  
  return (
    <Wrapper>
    <div className='elem d-flex justify-content-between align-items-center my-2'>
    <div className='d-flex justify-content-start align-items-center'>
    <img src={!profileImage?.name ? import.meta.env.VITE_BACKEND_IMAGE_URL+'/no-img-user.png' : `${import.meta.env.VITE_BACKEND_IMAGE_URL}/${profileImage?.name}` } alt={username}/>
    <div className='d-flex flex-column justify-content-start align-items-start mx-2'>
      <span className='name m-0'>{username}</span>
      <p className='m-0'>{spaceName}</p>
      <p className='m-0'>{role}</p>
      <p className='m-0'>{category?.slice(0,2)?.join(', ')} {category?.length > 2 ? `+${category?.length - 2}` : ""}</p>
    </div>
    </div>
    <button className={((connectType && !status) || (!connectType && status)) ? 'unfollow-status px-3 py-1' : 'px-3 py-1'} onClick={() => ConnectAndDisconnet(_id)}>
      {(connectType && !status) ? 'Unfollow' :
      (connectType && status) ? 'Follow' :
      (!connectType && currentUser?.connection.find(item => item.connectedId?._id.toString() === _id.toString()) !== undefined && !status ) ? 'Unfollow' :
      (!connectType && status) ? 'Unfollow' :
      (!connectType && !status) ? 'Follow Back' :
      'Follow Back'
      }</button>
    </div>
    </Wrapper>)
}

const Wrapper = styled.main`
.elem{
  background-color: var(--color-12);
  padding: 5px;
  border-radius: var(--borderRadius);
  cursor: pointer;
  img{
    height: 50px;
    width: 40px;
    border-radius: var(--borderRadius);
    object-fit: cover;
  }
  div{
    span{
      font-size: 12px;
      font-weight: bold;
      color: var(--color-1);
    }
    p{
      font-size: 8px;
    }
  }
  button{
    border: none;
    background-color: var(--color-1);
    color: var(--color-2);
    border-radius: var(--borderRadius);
  }
  button:hover{
    background-color: var(--color-4);
    color: var(--color-1);
  }
  .unfollow-status{
    /* border: solid 2px var(--color-11); */
    background-color: var(--color-5);
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

export default ModalElementConnections

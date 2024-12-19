import React, { useState } from 'react'
import styled from 'styled-components'
import {axiosInstance} from '../../fetch/axiosConfig'


const ModalElementBuy = ({item, currentUser, buyItem}) => {

  const {imageName, imageOriginalName, _id, platformName, bookLink, courseLink, platformNameNotListed, imaginarioBookLink} = item

  const openLinkInNewTab = async (url) => {
    const infoData = buyItem?.collabId ? {collabId: buyItem?.collabId} : {}
    // const infoData = buyItem?.collabId ? {collabId: buyItem?.collabId, userId: buyItem?.currentUserId} : {userId: buyItem?.currentUserId}

    try { 
      const res = await axiosInstance.put(`/${buyItem?.contentType}s/${buyItem?._id}/clickOnBuy`, infoData);
      console.log(res?.data?.data);
    } catch (error) {
      console.log(error);
    }

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // console.log(buyItem)

  return (
    <Wrapper>
    <div className='elem d-flex justify-content-between align-items-center my-2' onClick={() => openLinkInNewTab(bookLink || courseLink)}>
    <img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}/${imageName}`} alt={imageOriginalName}/>
    <p className='name m-0'>{(platformName === 'Not Found' || !platformName) ? platformNameNotListed : platformName}</p>
    <span className='text-danger'>{(buyItem?.promotion?.status === true && buyItem?.promotion?.platforms.includes(platformNameNotListed || platformName)) ? `-${buyItem?.promotion?.reduction}%` : ''}</span>
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
  p{
    font-size: 12px;
  }
    span{
      font-size: 12px;
      font-weight: bold;
      color: var(--color-1);
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

export default ModalElementBuy

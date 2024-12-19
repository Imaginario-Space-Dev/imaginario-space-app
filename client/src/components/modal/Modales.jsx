import React, { useEffect } from 'react'
import styled from 'styled-components'
import {listNotifications} from '../../data/carousel'
import { NotificationHeader, ModalContent } from '../index'
import {UseGeneralContext, UseUserContext} from '../../mainIndex'
import useFetch from '../../fetch/useFetch'

const Modales = ({currentUser, cart, notifications, getCurrentUser, notifType, getNotification, updateCart, updateSharedItem}) => {
  const {isModal, isModalContent, closeModal} = UseGeneralContext()
  const {buyItem} = UseUserContext()

  let FetchedData = isModalContent === 'cart' ? cart : 
  isModalContent === 'notification' ? notifications : 
  isModalContent === 'connection' ? currentUser?.connection : 
  isModalContent === 'buy-book' ? buyItem?.platforms : 
  isModalContent === 'buy-course' ? buyItem?.platforms : 
  []
  //  console.log(buyItem)
  return (
    <Wrapper>
      {isModal && 
    <div className='modales-container'>
     <ModalContent currentUser={currentUser} cart={cart} 
     notifications={notifications} list={FetchedData?.sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt))} 
     modalType={isModalContent} closeModal={closeModal} getNotification={getNotification}
     updateCart={updateCart} updateSharedItem={updateSharedItem} getCurrentUser={getCurrentUser} 
     buyItem={buyItem}/>
    </div>
    }
</Wrapper>)
}
const Wrapper = styled.main`
.modales-container {
  position: fixed;
  z-index: 2;
  background-color: var(--color-2);
}

/* FOR TABLETS AND MOBILES */
@media only screen and (min-width: 992px) {
.modales-container {
  bottom: 0rem;
  left: 0;
  height: 100%;
  width: 100%; 
  padding: 2rem 20rem 0rem 20rem;
}
}

/* Large devices (desktops) */
@media (max-width: 991px) {
.modales-container {
  bottom: 0rem;
  left: 0;
  height: 100%;
  width: 100%; 
  padding: 20px;
}
}
`
export default Modales

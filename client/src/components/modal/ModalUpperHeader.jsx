import React from 'react'
import styled from 'styled-components'
import { FaBell, FaTimes, FaShoppingCart, FaLink, FaBook, FaPlay } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";

const ModalUpperHeader = ({modalType, closeModal}) => {
  // console.log(modalType)
  return (
    <Wrapper>
    <div className='header-up mb-3 d-flex justify-content-between align-items-center'>
            <span>{(modalType !== undefined) && 
              modalType  == 'cart' ? <FaShoppingCart /> :
              modalType  == 'notification' ? <FaBell /> :
              modalType  == 'buy-book' ? <FaBook /> :
              modalType  == 'buy-course' ? <FaPlay /> :
              modalType  == 'connection' ? <FaLink /> :
              modalType.includes('share')  ? <IoIosSend /> :
              undefined
              }</span>
            <span>
              {modalType == 'notification' ? 'Notifications' :
               modalType == 'cart' ? 'Cart' :
               modalType == 'share-book' ? 'Share Book' : 
               modalType == 'share-course' ? 'Share Course' :
               modalType == 'share-blog' ? 'Share Blog' :
               modalType == 'share-profile' ? 'Share Profile' : 
               modalType == 'share-collection' ? 'Share Collection' :
               modalType == 'connection' ? 'Connections' :
               modalType == 'buy-book' ? 'Buy Book' :
               modalType == 'buy-course' ? 'Buy Book' :
               modalType == 'share-publisher' ? 'Share Publisher' : ''
              }           
              </span>
            <button type='button' onClick={closeModal} ><FaTimes /></button>
      </div>
    </Wrapper>)
}

const Wrapper = styled.main`
.header-up {
  span {
   color: var(--color-1);
   svg{
   color: var(--color-1);
    }
  }    
  button {
    background: transparent;
    border: none;
    svg{
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

export default ModalUpperHeader

import React from 'react'
import styled from 'styled-components'
import {UseUserContext} from '../../mainIndex'
import {ModalUpperHeader, ModalHeaderOptions, ModalHeaderShare, ModalHeaderConnections, ModalHeaderBuy} from '../index'

const ModalContent = ({currentUser, buyItem, list, getCurrentUser, modalType, closeModal, getNotification, updateCart, updateSharedItem}) => {
  const {shareItem} = UseUserContext()

  return (
    <Wrapper>
    <div className='modal-content'>
        <ModalUpperHeader modalType={modalType} closeModal={closeModal}/>
        {
          ['cart', 'notification'].includes(modalType) ?
          <ModalHeaderOptions currentUser={currentUser} list={list} closeModal={closeModal} modalType={modalType} 
          getNotification={getNotification} updateCart={updateCart}
          option0={"all"}option1={"system"} option2={"book"} option3={"course"} option4={"blog"} option5={"connection"} option6={"share"} /> :
          ['share-book', 'share-course', 'share-blog'].includes(modalType) ?
          <ModalHeaderShare list={shareItem} modalType={modalType} currentUser={currentUser}
          updateSharedItem={updateSharedItem} /> :
          modalType === 'connection' ?
          <ModalHeaderConnections list={list} getCurrentUser={getCurrentUser} modalType={modalType} currentUser={currentUser} /> :
          ['buy-book', 'buy-course'].includes(modalType) ?
          <ModalHeaderBuy list={list} modalType={modalType} currentUser={currentUser} buyItem={buyItem}/> 
          : undefined
      }
        
        
    </div>
    </Wrapper>)
}

const Wrapper = styled.main`

/* Extra large devices (large desktops) */
@media (min-width: 992px) {
.modal-content{
  padding: 20px;
  border: 1px solid var(--color-9);
  height: calc(100vh - 4rem);
}
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

export default ModalContent

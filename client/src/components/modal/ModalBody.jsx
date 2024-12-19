import React from 'react'
import styled from 'styled-components'
import {ModalElementOptions, ModalElementShare, ModalElementConnections, ModalElementBuy} from '../index'


const ModalBody = ({list, setFilteredData, buyItem, setLondingShare, londingShare, connectType, selectedData, setSelectedData, closeModal, modalType, currentUser, getNotification, updateCart}) => {

  return (
    <Wrapper>
    <div className={
      (modalType == 'cart' || modalType == 'notification') ? 
      'notif-body-1 w-100' :
      'notif-body-2 w-100'}>
      
    {  ['cart', 'notification'].includes(modalType) ? list?.map((item) => {
            const {_id} = item
            return (
              <div key={_id}>
                <ModalElementOptions key={_id} closeModal={closeModal} item={item} modalType={modalType} currentUser={currentUser}
                 getNotification={getNotification} updateCart={updateCart}/>
              </div>
            )
    }) : 
    ['share-book', 'share-course', 'share-blog'].includes(modalType) ?
    list?.map((item) => {
      const {_id} = item
      
      return (
        <div key={_id}>
          <ModalElementShare key={_id} selectedData={selectedData} setSelectedData={setSelectedData} closeModal={closeModal} item={item} modalType={modalType} currentUser={currentUser}/>
        </div>
      )
}) :
modalType === 'connection' ?
list?.map((item) => {
  const {connectedId} = item
  return (
    <div key={connectedId?._id}>
      <ModalElementConnections key={connectedId?._id} setLondingShare={setLondingShare} londingShare={londingShare} setFilteredData={setFilteredData} connectType={connectType} closeModal={closeModal} item={connectedId} modalType={modalType} currentUser={currentUser}/>
    </div>
  )
}) :
['buy-course', 'buy-book'].includes(modalType) ?
list?.map((item) => {
  const {_id} = item
  return (
    <div key={_id}>
      <ModalElementBuy closeModal={closeModal} item={item} buyItem={buyItem} modalType={modalType} currentUser={currentUser}/>
    </div>
  )
})  


: undefined}

</div>
</Wrapper>
)}



const Wrapper = styled.main`
.notif-body-1, .notif-body-2{
    padding: 5px;
    overflow-y: scroll;
}
/* Extra large devices (large desktops) */
@media (min-width: 992px) {
.notif-body-1{
  height: calc(100vh - 15rem);
  /* height: 650px; */
  /* margin-bottom: 20px */
}
.notif-body-2{
  height: calc(100vh - 18rem);
}
}
/* Large devices (desktops) */
@media (max-width: 991px) {
.notif-body-1{
  height: calc(100vh - 9.5rem);
}

.notif-body-2{
  height: calc(100vh - 15rem);
}

}

/* Medium devices (tablets) */
@media (max-width: 767px) {
.notif-body-1{
  height: calc(100vh - 9.5rem);
}

.notif-body-2{
  height: calc(100vh - 13rem);
}
}

@media (max-width: 576px) {

}

@media (max-width: 366px) {
}
`

export default ModalBody
